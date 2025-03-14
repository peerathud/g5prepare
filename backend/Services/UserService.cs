using backend.Data;
using backend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using backend.Models;
using System.Runtime.CompilerServices;
public class UesrService : IUserService
{
    private readonly AppDbContext _context;
    public UesrService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<AddNewUserDTOResponse> AddNewUser(AddNewUserDTORequest addNewUserDTORequest)
    {
        try
        {//check role
            var role = await _context.Roles.FindAsync(addNewUserDTORequest.roleId);
            if (role == null)
            {
                throw new Exception("Invalid Role ID");
            }
            //declare permisison for checking
            bool? requestisReadable = addNewUserDTORequest.permissions.FirstOrDefault()?.isReadable;
            bool? requestisWritable = addNewUserDTORequest.permissions.FirstOrDefault()?.isWritable;
            bool? requestisDeletable = addNewUserDTORequest.permissions.FirstOrDefault()?.isDeletable;
            //query PermisionId
            var PermissionsIdFromDb = await _context.Roles
            .Where(cp => cp.roleId == addNewUserDTORequest.roleId)
            .Select(cp => cp.permissionId)
            .FirstOrDefaultAsync();
            //query r w d where permissionId
            var checkPermission = await _context.Permissions.Where(cp => cp.permissionId == PermissionsIdFromDb)
            .Select(cp => new Permissions
            {
                isReadable = cp.isReadable,
                isWritable = cp.isWritable,
                isDeletable = cp.isDeletable
            }).FirstOrDefaultAsync();
            //check
            if (checkPermission == null)
            {
                throw new Exception("invalid permisisonId");
            }
            if (checkPermission.isReadable != requestisReadable || checkPermission.isWritable != requestisWritable || checkPermission.isDeletable != requestisDeletable)
            {
                throw new Exception("invalid permission read write delete");
            }
            //query PermissionName
            var permisisonName = await _context.Roles
            .Include(r => r.Permissions)
            .Where(r => r.roleId == addNewUserDTORequest.roleId)
            .Select(r => r.Permissions.permissionName)
            .FirstOrDefaultAsync();
            if (permisisonName == null)
            {
                throw new Exception("INvalid permissionName");
            }
            //hashed
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(addNewUserDTORequest.password);
            //declare and insert
            var newUser = new Users
            {
                userId = addNewUserDTORequest.id,
                firstName = addNewUserDTORequest.firstName,
                lastName = addNewUserDTORequest.lastName,
                email = addNewUserDTORequest.email,
                phone = addNewUserDTORequest.phone,
                username = addNewUserDTORequest.username,
                password = hashedPassword,
                roleId = addNewUserDTORequest.roleId
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
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
                permissions = new List<PermissionsResponse> { new PermissionsResponse{
                    permissionId = PermissionsIdFromDb,
                    permissionName = permisisonName,
                }

                }

            };
        }
        catch (Exception ex)
        {
            throw new Exception($"error:{ex.Message}");
        }

    }
}