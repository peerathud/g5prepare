using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;
using backend.Data;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

public class RoleService:IRoleService{
    private readonly AppDbContext _context;
    //inject db context
    public RoleService(AppDbContext context){
        _context = context;
    }
    public async Task<List<GetAllRoleDTO>>GetAllRoles(){
        var roles = await _context.Roles.
        Select(r=>new GetAllRoleDTO{
            roleId =r.roleId,
            roleName =r.roleName
        }).ToListAsync();
       return roles;
    }
}