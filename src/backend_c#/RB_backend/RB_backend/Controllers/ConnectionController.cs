using Microsoft.AspNetCore.Mvc;
using RB_backend.Providers;
using RB.DbHandler.Interfaces;
using RB.DbHandler.Models;

namespace RB_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ConnectionController: ControllerBase
{
    private readonly ILogger<ConnectionController> _logger;
    private readonly IDbDataReaderProvider<Connection> _provider;

    public ConnectionController(
    ILogger<ConnectionController> logger,
    IDbDataReaderProvider<Connection> provider)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _provider = provider ?? throw new ArgumentNullException(nameof(provider));
    }
    
    [HttpGet]
    public IEnumerable<Connection> GetConnections()
    {
        var connections = _provider.GetAll();
        return connections;
    }
}
