using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TypingTutor.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addnewproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Errors",
                table: "UserProgresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LevelNumber",
                table: "Levels",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Errors",
                table: "UserProgresses");

            migrationBuilder.DropColumn(
                name: "LevelNumber",
                table: "Levels");
        }
    }
}
