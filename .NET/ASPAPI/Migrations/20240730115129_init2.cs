using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPAPI.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Products_ProductId1",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_User_UserId1",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ProductId1",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_UserId1",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Transaction");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Transaction",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Transaction",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ProductId",
                table: "Transaction",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_UserId",
                table: "Transaction",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Products_ProductId",
                table: "Transaction",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_User_UserId",
                table: "Transaction",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Products_ProductId",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_User_UserId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ProductId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_UserId",
                table: "Transaction");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Transaction",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "Transaction",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId1",
                table: "Transaction",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Transaction",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ProductId1",
                table: "Transaction",
                column: "ProductId1");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_UserId1",
                table: "Transaction",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Products_ProductId1",
                table: "Transaction",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_User_UserId1",
                table: "Transaction",
                column: "UserId1",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
