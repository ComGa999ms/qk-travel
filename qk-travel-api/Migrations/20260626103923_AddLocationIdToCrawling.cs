using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QkTravelApi.Migrations
{
    /// <inheritdoc />
    public partial class AddLocationIdToCrawling : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "CrawlJobs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "CrawledTravelItems",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CrawlJobs_LocationId",
                table: "CrawlJobs",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawledTravelItems_LocationId_Type_IsApproved",
                table: "CrawledTravelItems",
                columns: new[] { "LocationId", "Type", "IsApproved" });

            migrationBuilder.AddForeignKey(
                name: "FK_CrawledTravelItems_Locations_LocationId",
                table: "CrawledTravelItems",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_CrawlJobs_Locations_LocationId",
                table: "CrawlJobs",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrawledTravelItems_Locations_LocationId",
                table: "CrawledTravelItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CrawlJobs_Locations_LocationId",
                table: "CrawlJobs");

            migrationBuilder.DropIndex(
                name: "IX_CrawlJobs_LocationId",
                table: "CrawlJobs");

            migrationBuilder.DropIndex(
                name: "IX_CrawledTravelItems_LocationId_Type_IsApproved",
                table: "CrawledTravelItems");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "CrawlJobs");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "CrawledTravelItems");
        }
    }
}
