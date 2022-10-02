using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using project.Socket;
using project.Email;
using Microsoft.AspNetCore.Http;

namespace project
{
    public class Startup
    {
        public static string rootPath;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            rootPath = env.ContentRootPath;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddCors(option => {
            //     option.AddPolicy("mycors", policy => {
            //         policy.WithOrigins
            //     });
            // });
            services.AddControllersWithViews();
            services.AddDistributedMemoryCache();  
            services.AddSession(options => {  
                options.IdleTimeout = TimeSpan.FromMinutes(60);//You can set Time
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; 
            });  
            services.AddMvc();
            services.AddSignalR(e => {
                e.MaximumReceiveMessageSize = 102400000;
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSession();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(x => x.WithOrigins("http://localhost:3000", "https://vijnh.online").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {  
                endpoints.MapGet("/{any}", async (http) => {
                    await http.Response.SendFileAsync("./wwwroot/index.html");
                });
                endpoints.MapControllerRoute(
                    "friend",
                    "friend/{action}",
                    new {controller = "Friend"}
                );
                endpoints.MapControllerRoute(
                    "home",
                    "Home/{action}",
                    new {controller = "Home", action = "Index"}
                );
                endpoints.MapControllerRoute(
                    "account",
                    "account/{action}",
                    new {controller = "Account", action = "Login"}
                );
                endpoints.MapControllerRoute(
                    "database",
                    "DataBase/{action}",
                    new {controller = "DataBase", action = "Init"}
                );
                // endpoints.MapControllerRoute(
                //     name: "default",
                //     pattern: "{controller=Home}/{action=Index}/{id?}"
                // ); 
                endpoints.MapHub<Chat>("/chat");                       
            });
        }
    }
}
