const apiURL = "https://provinces.open-api.vn/api/?depth=2";
const phonenumber = document.querySelector(".phonenumber");
const email = document.querySelector(".email");
const city = document.querySelector(".city");
const district = document.querySelector(".district");
const submitButton = document.querySelector(".submit-button");
const headRow = document.querySelector(".head-row");
let cityIndex;
let districtIndex;
let cityData;
let districtData;

const dataForm = {
  phonenumber: "",
  email: "",
  city: "",
  district: "",
};

const renderData = (data, selector) => {
  let row = ' <option disable value="">Chọn</option>';
  data.forEach(
    (data, index) =>
      (row += `<option data-id="${index}" value="${data.name}">${data.name}</option>`)
  );

  selector.innerHTML = row;
};

const apiData = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        return resolve(data);
      }
      resolve("Không tìm thấy dữ liệu");
    } catch (error) {
      reject(error);
    }
  });
};

const fetchCityData = async () => {
  cityData = await apiData(apiURL);
  renderData(cityData, city);
};
fetchCityData();

const fetchDistrictData = async () => {
  districtData = cityData[cityIndex].districts;

  // Lưu trữ data đã chọn:
  dataForm.city = cityData[cityIndex].name;

  // Hiển thị data:
  renderData(districtData, district);
};

const renderResult = (data) => {
  console.log("dataaaaaaaaaa ", data);
  return `
  <tr>
    <td>${data.phonenumber}</td>
    <td>${data.email}</td>
    <td>${data.city}</td>
    <td>${data.district}</td>
  </tr>
  `;
};

// Event Listener:
city.addEventListener("change", (event) => {
  cityIndex = city.options[city.selectedIndex].dataset.id;
  fetchDistrictData();
});

district.addEventListener("change", () => {
  districtIndex = district.options[district.selectedIndex].dataset.id;

  // Lưu trữ data đã chọn:
  dataForm.district = districtData[districtIndex].name;
});

phonenumber.addEventListener("keydown", (event) => {
  dataForm.phonenumber = event.target.value;
});

email.addEventListener("keydown", (event) => {
  console.log(event.target.value);
  dataForm.email = event.target.value;
  console.log(dataForm);
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const html = renderResult(dataForm);
  headRow.insertAdjacentHTML("afterend", html);
});
