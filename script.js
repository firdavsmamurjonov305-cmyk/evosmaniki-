document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("profileForm").addEventListener("submit", event => {
  event.preventDefault();
  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const gender = document.getElementById("gender").value;
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  let bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  let calories = Math.round(bmr * activity);
  if (goal === "lose") calories -= 350;
  if (goal === "gain") calories += 300;
  calories = Math.max(1200, calories);

  const protein = Math.round(weight * (goal === "gain" ? 1.8 : 1.6));
  const fat = Math.round(calories * 0.27 / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

  document.getElementById("dailyCalories").textContent = calories.toLocaleString("uz-UZ");
  document.getElementById("proteinValue").textContent = `${protein} g`;
  document.getElementById("fatValue").textContent = `${fat} g`;
  document.getElementById("carbsValue").textContent = `${carbs} g`;
  document.getElementById("goalText").textContent = goal === "lose"
    ? "Vazn yo'qotish uchun kuniga taxminan 350 kkal kamroq energiya rejalashtirilgan."
    : goal === "gain"
      ? "Vazn to'plash uchun kuniga taxminan 300 kkal ko'proq energiya rejalashtirilgan."
      : "Hozirgi vaznni saqlash uchun mos kunlik kaloriya ehtiyoji.";
  document.getElementById("resultCard").classList.add("calculated");
});

const foodDatabase = [
  { words: ["salad", "salat"], name: "Sabzavotli salat", calories: 180, protein: 6, fat: 8, carbs: 22 },
  { words: ["chicken", "tovuq", "kotlet"], name: "Tovuq go'shtili taom", calories: 420, protein: 36, fat: 18, carbs: 28 },
  { words: ["plov", "osh"], name: "Tovuq/qo'y go'shtli osh", calories: 520, protein: 22, fat: 20, carbs: 64 },
  { words: ["burger", "gamburger"], name: "Burger", calories: 580, protein: 27, fat: 30, carbs: 48 },
  { words: ["pizza", "pitsa"], name: "Pitsa", calories: 610, protein: 24, fat: 26, carbs: 68 },
  { words: ["pasta", "spagetti", "makaron"], name: "Makaronli taom", calories: 390, protein: 15, fat: 12, carbs: 56 },
  { words: ["rice", "guruch"], name: "Guruchli ovqat", calories: 340, protein: 8, fat: 7, carbs: 62 },
  { words: ["egg", "tuxum"], name: "Tuxumli taom", calories: 230, protein: 15, fat: 17, carbs: 2 },
  { words: ["fruit", "meva", "banana", "banan", "apple", "olma", "uzum", "nok", "behi"], name: "Mevali vazifa", calories: 160, protein: 2, fat: 1, carbs: 38 },
  { words: ["soup", "shurva", "sho'rva"], name: "Shurva", calories: 290, protein: 19, fat: 12, carbs: 24 },
  { words: ["sandwich", "sendvich"], name: "Sendvich", calories: 360, protein: 16, fat: 14, carbs: 42 }
];

document.getElementById("foodImage").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const preview = document.getElementById("foodPreview");
  preview.src = URL.createObjectURL(file);
  preview.classList.add("visible");
  document.getElementById("uploadPlaceholder").classList.add("hidden");

  const fileName = file.name.toLowerCase();
  const match = foodDatabase.find(item => item.words.some(word => fileName.includes(word)));
  const result = match || { name: "Umumiy ovqat porsiyasi", calories: 420, protein: 18, fat: 16, carbs: 48 };
  document.getElementById("foodName").textContent = result.name;
  document.getElementById("foodCalories").textContent = result.calories;
  document.getElementById("foodProtein").textContent = `${result.protein} g`;
  document.getElementById("foodFat").textContent = `${result.fat} g`;
  document.getElementById("foodCarbs").textContent = `${result.carbs} g`;
  document.getElementById("nutritionCard").classList.add("calculated");
});

const restaurants = [
  { name: "Oq Saroy Oshxona", type: "Milliy oshxona", rating: "4.9", time: "25-35 daq", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80", dishes: ["Osh", "Lag'mon", "Somsa"] },
  { name: "Green Kitchen", type: "Sog'lom ovqat", rating: "4.8", time: "20-30 daq", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80", dishes: ["Salat", "Bowls", "Smoother"] },
  { name: "Pizza Corner", type: "Pitsa va italyan", rating: "4.7", time: "30-40 daq", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80", dishes: ["Pitsa", "Pasta", "Bruschetta"] },
  { name: "Burger Lab", type: "Burger va snacks", rating: "4.8", time: "20-35 daq", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80", dishes: ["Burger", "Kartoshka", "Shakes"] },
  { name: "Yaponcha", type: "Yapon oshxonasi", rating: "4.9", time: "35-45 daq", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80", dishes: ["Sushi", "Ramen", "Sets"] },
  { name: "Choyxona 76", type: "Milliy taomlar", rating: "4.6", time: "25-40 daq", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=700&q=80", dishes: ["Manti", "Chuchvara", "Norin"] }
];

function renderRestaurants(search = "") {
  const query = search.toLowerCase();
  const filtered = restaurants.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query) ||
    item.dishes.some(dish => dish.toLowerCase().includes(query))
  );
  document.getElementById("restaurantGrid").innerHTML = filtered.map(item => `
    <article class="restaurant-card">
      <div class="restaurant-image">
        <img src="${item.image}" alt="${item.name}">
        <span class="rating">★ ${item.rating}</span>
      </div>
      <div class="restaurant-info">
        <span class="restaurant-type">${item.type}</span>
        <h3>${item.name}</h3>
        <div class="dish-tags">${item.dishes.map(dish => `<span>${dish}</span>`).join("")}</div>
        <div class="delivery">${item.time}</div>
      </div>
    </article>
  `).join("");
}

document.getElementById("restaurantSearch").addEventListener("input", event => {
  renderRestaurants(event.target.value);
});

document.getElementById("supportBtn").addEventListener("click", () => {
  document.getElementById("supportPanel").classList.toggle("open");
});
document.getElementById("closeSupport").addEventListener("click", () => {
  document.getElementById("supportPanel").classList.remove("open");
});
document.querySelectorAll("[data-support]").forEach(button => {
  button.addEventListener("click", () => {
    const reply = document.createElement("p");
    const answers = {
      "Kaloriyani qanday hisoblash kerak?": "Yosh, bo'y, vazn, faoliyat va maqsadni kiriting.",
      "Ovqat rasmini qanday yuklash mumkin?": "Ovqat rasmini tanlang — o'ng tomonda ta'rifi paydo bo'ladi.",
      "Mahsulotlar haqida": "Fit taomlarni restorandagi mahalliy menyudan tanlang."
    };
    reply.textContent = answers[button.dataset.support];
    document.querySelector(".support-body").appendChild(reply);
  });
});

renderRestaurants();
