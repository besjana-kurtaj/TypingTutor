using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TypingTutor.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//var connectionString = builder.Configuration.GetConnectionString("TypingTutor");
//builder.Services.AddDbContext<TypingTutorDbContext>(options =>
//options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)), ServiceLifetime.Scoped);

builder.Services.AddDbContext<TypingTutorDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("TypingTutor")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
