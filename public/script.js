
    const form = document.getElementById("weatherForm");
    const cityInput = document.getElementById("city");
    const errorEl = document.getElementById("error");
    const loadingEl = document.getElementById("loading");
    const resultEl = document.getElementById("result");

    const cityNameEl = document.getElementById("cityName");
    const tempEl = document.getElementById("temp");
    const conditionEl = document.getElementById("condition");
    const iconEl = document.getElementById("icon");

    const toggleBtn = document.getElementById("themeToggle");

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const city = cityInput.value.trim();
      errorEl.textContent = "";
      resultEl.style.display = "none";

      if (!city) {
        errorEl.textContent = "Please enter a city name.";
        return;
      }

      loadingEl.style.display = "block";


    try {
        const res = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `city=${encodeURIComponent(city)}`
        });

        if (!res.ok) {
        throw new Error("City not found");
        }

        const data = await res.json();

        cityNameEl.textContent = data.city;
        tempEl.textContent = `${Math.round(data.temp)}°C`;
        conditionEl.textContent = data.condition;
        iconEl.src = data.image;

        resultEl.style.display = "block";
    } catch (err) {
        errorEl.textContent = "City not found. Please try again.";
    } finally {
        loadingEl.style.display = "none";
    }

    });