using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

public class PermissionService:IPermissionService{
    private readonly AppDbContext _context;
    public PermissionService(AppDbContext context){
        _context = context;
    }
    public async Task<List<GetAllPermissionDTO>>GetAllPermission(){
        var permissions =await _context.Permissions
        .Select(p=>new GetAllPermissionDTO{
            permissionId =p.permissionId,
            permissionName =p.permissionName,
        }).ToListAsync();
        return permissions;
    }
}