const $button = document.querySelector("#calcButton");
$button.addEventListener("click", () => getFuels());
document.addEventListener("keypress", e => (e.key === "Enter" ? getFuels() : false));

const getFuels = () => {
     const $fuels = document.querySelectorAll("input");
     verifyIfEmpty($fuels);
};

const calculateFuel = $fuels => {
     const ethanol = formatNumber($fuels[0]);
     const gasoline = formatNumber($fuels[1]);
     const result = ethanol / gasoline;

     return result;
};

const formatNumber = number => number.value.replace(",", ".");

const verifyIfEmpty = $fuels =>
     $fuels[0].value == 0 || $fuels[1].value == 0
          ? printErrorMsg($fuels)
          : moreAdvantage(calculateFuel($fuels), $fuels);

const moreAdvantage = (result, $fuels) => {
     result <= 0.7 ? printResult("Etanol", $fuels) : printResult("Gasolina", $fuels);
};

const printResult = (result, $fuels) => {
     const $result = document.querySelector("#fuel");
     const $popUp = document.querySelector("#popUp");
     const $prevButton = document.querySelector("#prevButton");

     $result.innerText = result;
     $popUp.style.display = "flex";
     $prevButton.focus();
     removeAllClasses($prevButton);
     addClassButton(result, $prevButton);
     closeModal($prevButton, $popUp, $fuels);
};

const addClassButton = (result, $prevButton) =>
     result === "Etanol"
          ? $prevButton.classList.add("ethanol")
          : $prevButton.classList.add("gasoline");

const removeAllClasses = $prevButton => $prevButton.removeAttribute("class");

const printErrorMsg = $fuels => {
     const $errorMsg = document.querySelector("#errorMsg");
     $errorMsg.style.display = "block";
     removeErrorMsg($errorMsg, $fuels);
};

const removeErrorMsg = ($errorMsg, $fuels) => {
     setTimeout(function () {
          $errorMsg.style.display = "none";
          $fuels[0].focus();
     }, 3000);
};

const closeModal = ($prevButton, $popUp, $fuels) => {
     /* Close modal with click */
     $prevButton.addEventListener("click", () => {
          $popUp.style.display = "none";
          clearInputs($fuels);
     });

     /* Close modal with esc key */
     document.addEventListener("keydown", e =>
          e.key === "Escape" ? (($popUp.style.display = "none"), clearInputs($fuels)) : false
     );
};

const clearInputs = $fuels => ($fuels[0].focus(), $fuels.forEach(fuel => (fuel.value = "")));
