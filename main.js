const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

//  console.log( spendingInput , priceInput , formBtn)

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;
function updateTotal(price) {
  // total değer ve girilen değeri toplama
  total += Number(price);
  //  console.log(price)
  totalInfo.textContent = total;
  //   console.log(total)
}

// gider olusturma
function addExpense(e) {
  e.preventDefault();
  // console.log("tiklandi");
  // console.log(spendingInput.value , priceInput.value)

  if (!priceInput.value || !spendingInput.value) {
    alert("please add product!!");
    // fonksiyonu durdurmak icin
    return;
  }

  // 1) kullanıcı veri girdiğinde ve ekle dediğinde div oluştur
  const spendingDiv = document.createElement("div");

  // 2) class ekleme
  spendingDiv.classList.add("spending");

  // console.dir(statusCheck)
  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  // 3) içeriğini ayarlama

  spendingDiv.innerHTML = `
<div class="spending">
    <h2>${spendingInput.value}=</h2>
    <h2 id="value">${priceInput.value}</h2>

    <div class="buttons">
    <img id = "payment" src="images/payment.png" alt="" />
    <img id = "remove" src="images/delete.png" alt="" />
    </div>
    </div>`;

  // 4) listeye eleman ekleme
  list.appendChild(spendingDiv);

  // toplami guncelleme
  updateTotal(priceInput.value);

  // formu temizleme
  spendingInput.value = "";
  priceInput.value = "";
}
function handleClick(e) {
  const element = e.target;
  // console.dir(e)

  if (element.id === "remove") {
    // parentElement: tıklanılan elemanın kapsayıcısına ulaşma, (kapsayıcısının kapsayıcısı)

    const wrapper = element.parentElement.parentElement;
    //  console.log(wrapper)

    // silinen elemanın fiyatını alma
    const deletedPrice = wrapper.querySelector("#value").innerText;
    Number(deletedPrice.innerText);

    // silinenin fiyatını toplamdan çıkarma ,updateTotal'İ güncelleme
    updateTotal(-Number(deletedPrice));

    // kapsayıcıyı kaldır
    wrapper.remove();
  }
}
/* filtreleme işlemleri */
function handleFilter(e) {
  // console.log(e.target.value);

  // ! childNodes :
  // parentElement elementin tersine kapsayıcıya doğru değil de ,elemana doğru ilerleme
  // console.log(list.childNodes)
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        // yalnızca classında "payed" olanlar silinsin
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
