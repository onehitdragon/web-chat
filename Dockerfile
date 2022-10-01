FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY project.csproj .
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS certificate
RUN dotnet dev-certs https -ep /https/aspnetapp.pfx -p vinhpass
RUN dotnet dev-certs https --trust

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS run
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=certificate /https /https
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=vinhpass
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
ENTRYPOINT ["dotnet", "project.dll"]
