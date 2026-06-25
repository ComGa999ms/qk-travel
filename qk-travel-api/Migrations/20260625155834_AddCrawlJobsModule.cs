using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QkTravelApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCrawlJobsModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CrawlJobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Source = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LocationName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ItemType = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    MaxItems = table.Column<int>(type: "integer", nullable: false),
                    TotalItems = table.Column<int>(type: "integer", nullable: false),
                    SuccessItems = table.Column<int>(type: "integer", nullable: false),
                    FailedItems = table.Column<int>(type: "integer", nullable: false),
                    ErrorMessage = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedByUserId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    StartedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FinishedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlJobs_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CrawledTravelItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CrawlJobId = table.Column<int>(type: "integer", nullable: false),
                    SourceName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SourceUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    LocationName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ImageUrl = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Rating = table.Column<decimal>(type: "numeric(3,2)", nullable: true),
                    PriceText = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    RawJson = table.Column<string>(type: "text", nullable: true),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    FetchedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawledTravelItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawledTravelItems_CrawlJobs_CrawlJobId",
                        column: x => x.CrawlJobId,
                        principalTable: "CrawlJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CrawlJobLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CrawlJobId = table.Column<int>(type: "integer", nullable: false),
                    Level = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlJobLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlJobLogs_CrawlJobs_CrawlJobId",
                        column: x => x.CrawlJobId,
                        principalTable: "CrawlJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrawledTravelItems_CrawlJobId",
                table: "CrawledTravelItems",
                column: "CrawlJobId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawledTravelItems_LocationName_Type_IsApproved",
                table: "CrawledTravelItems",
                columns: new[] { "LocationName", "Type", "IsApproved" });

            migrationBuilder.CreateIndex(
                name: "IX_CrawledTravelItems_SourceName_SourceUrl",
                table: "CrawledTravelItems",
                columns: new[] { "SourceName", "SourceUrl" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CrawlJobLogs_CrawlJobId",
                table: "CrawlJobLogs",
                column: "CrawlJobId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlJobs_CreatedAt",
                table: "CrawlJobs",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlJobs_CreatedByUserId",
                table: "CrawlJobs",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlJobs_Status",
                table: "CrawlJobs",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrawledTravelItems");

            migrationBuilder.DropTable(
                name: "CrawlJobLogs");

            migrationBuilder.DropTable(
                name: "CrawlJobs");
        }
    }
}
