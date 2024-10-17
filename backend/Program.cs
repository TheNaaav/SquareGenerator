var builder = WebApplication.CreateBuilder(args);

// Konfigurerar CORS(Cross-Origin Resource Sharing) för att till�ta f�rfr�gningar fr�n en specifik origin (React-appen)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            // Till�t f�rfr�gningar fr�n http://localhost:3000 (React app under utveckling)
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyMethod() // Till�t alla HTTP-metoder (GET, POST, PUT, etc.)
                   .AllowAnyHeader();
        });
});

// L�gger till tj�nster f�r att st�dja MVC-kontroller
builder.Services.AddControllers();

// L�gger till tj�nst f�r att utforska API-slutpunkter
builder.Services.AddEndpointsApiExplorer();

// L�gger till Swagger-tj�nst f�r att automatiskt generera API-dokumentation
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowReactApp");

app.UseRouting();

// Definierar att kontrollernas slutpunkter ska vara tillg�ngliga via routing
app.UseEndpoints(endpoints =>
{
    // Kopplar routingen till API-kontrollerna
    endpoints.MapControllers();
});

app.Run();