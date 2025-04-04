using backend.Data;
using backend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using backend.Models;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Transactions;
using Azure.Core;
public class UesrService : IUserService
{
    private readonly AppDbContext _context;
    public UesrService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<AddNewUserDTOResponse> AddNewUser(AddNewUserDTORequest addNewUserDTORequest)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {

            //check role
            var role = await _context.Roles.FindAsync(addNewUserDTORequest.roleId);
            if (role == null)
            {
                throw new Exception("Invalid Role ID");

            }
            var permission = await _context.Permissions.FindAsync(addNewUserDTORequest.permissions.FirstOrDefault().permissionsId);
            if (permission == null)
            {
                throw new Exception("Invalid PermissionsId");
            }

            //hashed
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(addNewUserDTORequest.password);

            var newUser = new Users
            {
                userId = addNewUserDTORequest.id,
                firstName = addNewUserDTORequest.firstName,
                lastName = addNewUserDTORequest.lastName,
                email = addNewUserDTORequest.email,
                phone = addNewUserDTORequest.phone,
                username = addNewUserDTORequest.username,
                password = hashedPassword,
                roleId = addNewUserDTORequest.roleId,
                createdDate = DateTime.Now.Date,
            };
            Console.WriteLine($"[DEBUG] Before Insert - UserId: {newUser.roleId}");
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            var userPermissionsData = addNewUserDTORequest.permissions.Select(up => new User_Permissions
            {
                userId = newUser.userId,
                permissionId = up.permissionsId,
                isReadable = up.isReadable,
                isWritable = up.isWritable,
                isDeletable = up.isDeletable,
            }).ToList();
            _context.User_Permissions.AddRange(userPermissionsData);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return new AddNewUserDTOResponse
            {
                userId = newUser.userId,
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                email = newUser.email,
                phone = newUser.phone,
                role = new RoleResponse
                {
                    roleId = role.roleId,
                    roleName = role.roleName,
                },
                username = newUser.username,
                permissions = new List<PermissionsResponse> { new PermissionsResponse{
                    permissionId = permission.permissionId,
                    permissionName = permission.permissionName,
                }
                }
            };
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new Exception($"error:{ex.Message}");
        }
    }
    public async Task<GetAllUserDTOResponse> GetAllUser(GetAllUserDTORequest getAllUserDTORequest)
    {
        try
        {
            var query = _context.Users.AsQueryable();
            if (!string.IsNullOrEmpty(getAllUserDTORequest.search))
            {
                query = query.Where(u => u.firstName.Contains(getAllUserDTORequest.search) || u.lastName.Contains(getAllUserDTORequest.search) || u.roleId.Contains(getAllUserDTORequest.search));

            }
            if (!string.IsNullOrEmpty(getAllUserDTORequest.orderBy) && !string.IsNullOrEmpty(getAllUserDTORequest.orderDirection))
            {
                var orderByProperty = getAllUserDTORequest.orderBy.ToLower();
                var orderDirection = getAllUserDTORequest.orderDirection.ToLower();
                if (orderByProperty == "firstname" && orderDirection == "asc")
                {
                    query = query.OrderBy(u => u.firstName);
                }
                else if (orderByProperty == "firstName" && orderDirection == "desc")
                {
                    query = query.OrderByDescending(u => u.firstName);
                }
                else if (orderByProperty == "createddate" && orderDirection == "asc")
                {
                    query = query.OrderBy(u => u.createdDate);
                }
                else if (orderByProperty == "createddate" && orderDirection == "desc")
                {
                    query = query.OrderByDescending(u => u.createdDate);
                }
                else if (orderByProperty == "roleid" && orderDirection == "asc")
                {
                    query = query.OrderBy(u => u.roleId);
                }
                else if (orderByProperty == "roleid" && orderDirection == "desc")
                {
                    query = query.OrderByDescending(u => u.roleId);
                }
                else
                {
                    query = query.OrderBy(u => u.userId);
                }
            }
            if(getAllUserDTORequest.pageNumber.HasValue&&getAllUserDTORequest.pageSize.HasValue){
                query=query.Skip((getAllUserDTORequest.pageNumber.Value-1)*getAllUserDTORequest.pageSize.Value).Take(getAllUserDTORequest.pageSize.Value);
            }
            var totalCount = await query.CountAsync();
            var users =await query.Select(u=>new DataSourceResponse{
                userId =u.userId,
                firstName =u.firstName,
                LastName =u.lastName,
                email =u.email,
                role =new RoleResponse{
                    roleId =u.roleId,
                    roleName =u.Roles.roleName
                },
                username =u.username,
                createdDate =u.createdDate,
                permissions =u.User_Permissions.Select(p=>new PermissionsResponse{
                    permissionId =p.permissionId,
                    permissionName =p.Permissions.permissionName,
                }).ToList()
            }).ToListAsync();
            return new GetAllUserDTOResponse{
                DataSource =users,
                page =getAllUserDTORequest.pageNumber?? 1,
                pageSize =getAllUserDTORequest.pageSize?? 1,
                totalCount=totalCount
            };
        }
        catch (Exception ex)
        {
            throw new Exception($"error:{ex.Message}");
        }
    }
    public async Task<DeleteUserDTOResponse> DeleteUser(string id)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var userId = id;
            var user = await _context.Users.FirstOrDefaultAsync(user => userId == user.userId);

            if (user == null)
            {
                return new DeleteUserDTOResponse
                {
                    result = false,
                    message = "invalid userId"
                };
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            var userPermission = await _context.User_Permissions.FirstOrDefaultAsync(user => userId == user.userId);
            if (userPermission == null)
            {
                return new DeleteUserDTOResponse
                {
                    result = false,
                    message = "invalid userPermissionId"
                };
            }
            _context.User_Permissions.Remove(userPermission);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return new DeleteUserDTOResponse
            {
                result = true,
                message = "User delete successfully"
            };

        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return new DeleteUserDTOResponse
            {
                result = false,
                message = $"Unexpected error:{ex.Message}"
            };
        }
    }
    public async Task<GetUserByIdDTOResponse> GetUserById(string id)
    {
        try
        {
            var userData = await _context.Users
            .Include(u => u.Roles)
            .Include(u => u.User_Permissions)
            .ThenInclude(u => u.Permissions)
            .FirstOrDefaultAsync(u => u.userId == id);
            if (userData == null)
            {
                throw new Exception("user not found");
            }
            return new GetUserByIdDTOResponse
            {
                id = userData.userId,
                firstName = userData.firstName,
                LastName = userData.lastName,
                email = userData.email,
                phone = userData.phone,
                role = new RoleResponse
                {
                    roleId = userData.roleId,
                    roleName = userData.username
                },
                username = userData.username,
                permissions = new List<PermissionsResponse> { new PermissionsResponse{
                    permissionId = userData.User_Permissions.FirstOrDefault().permissionId,
                    permissionName = userData.User_Permissions.FirstOrDefault().Permissions.permissionName
                }
            }
            };
        }
        catch (Exception ex)
        {
            throw new Exception("An unexpected error occurred:" + ex.Message);
        }
    }
    public async Task<EditUserDTOResponse> EditUserById(EditUserDTORequest request, string id)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var userData = await _context.Users
            .Include(u => u.Roles)
            .Include(up => up.User_Permissions)
            .ThenInclude(up => up.Permissions)
            .FirstOrDefaultAsync(u => u.userId == id);
            if (userData == null)
            {

                throw new Exception($"User ID: {id} doesn't exist");
            }

            string hashedNewPassword = BCrypt.Net.BCrypt.HashPassword(request.password);
            userData.firstName = request.firstName;
            userData.lastName = request.lastName;
            userData.email = request.email;
            userData.phone = request.phone;
            userData.roleId = request.roleId;
            userData.username = request.username;
            userData.password = hashedNewPassword;

            var userPermission = userData.User_Permissions.FirstOrDefault();
            if (userPermission == null)
            {
                throw new Exception($"User ID: {id} does not have assigned permissions.");
            }
            userPermission.permissionId = request.permission.First().permissionId;
            userPermission.isReadable = request.permission.First().isReadable;
            userPermission.isWritable = request.permission.First().isWritable;
            userPermission.isDeletable = request.permission.First().isDeletable;
            // _context.User_Permissions.Update(userPermission);

            await _context.SaveChangesAsync();


            await transaction.CommitAsync();



            return new EditUserDTOResponse
            {
                userId = userData.userId,
                firstName = userData.firstName,
                LastName = userData.lastName,
                email = userData.email,
                phone = userData.phone,
                role = new RoleResponse
                {
                    roleId = userData.roleId,
                    roleName = userData.Roles.roleName,
                },
                username = userData.username,
                permissions = new List<PermissionsResponse>{
                    new PermissionsResponse{
                        permissionId = userData.User_Permissions.FirstOrDefault().permissionId,
                    permissionName = userData.User_Permissions.FirstOrDefault().Permissions.permissionName
                    }
                }

            };

        }
        catch (Exception ex)
        {

            await transaction.RollbackAsync();
            throw new Exception("An unexpected error occurred" + ex.Message);
        }
    }
}
