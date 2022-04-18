"use strict";
{
  const resetBtn = document.querySelector("footer button");

  let inputBill = document.querySelector(".bill-input");
  let inputPeople = document.querySelector(".people-input");
  let inputCustom = document.querySelector(".tips-container input");

  class tipCalculator {
    constructor(inputBill, inputPeople, inputCustom, resetBtn) {
      this.inputBill = inputBill;
      this.inputPeople = inputPeople;
      this.inputCustom = inputCustom;
      this.resetBtn = resetBtn;
    }

    validateInputPeople() {
      let debounceTimer;

      inputPeople.addEventListener("input", () => {
        clearTimeout(debounceTimer);

        if (inputPeople.value.includes(".")) {
          debounceTimer = setTimeout(() => {
            this.inputPeople.value = parseInt(this.inputPeople.value);
          }, 0);
        }
      });
    }

    validateInputBill() {
      let debounceTimer;

      inputBill.addEventListener("input", () => {
        clearTimeout(debounceTimer);

        if (inputBill.value.includes(".")) {
          debounceTimer = setTimeout(() => {
            this.inputBill.value =
              Math.floor(parseFloat(this.inputBill.value) * 100) / 100;
          }, 500);
        }
      });
    }

    validateInputCustom() {
      let debounceTimer;

      inputCustom.addEventListener("input", () => {
        clearTimeout(debounceTimer);

        if (inputCustom.value.includes(".")) {
          debounceTimer = setTimeout(() => {
            this.inputCustom.value =
              Math.floor(parseFloat(this.inputCustom.value) * 100) / 100;
          }, 500);
        }
      });
    }

    clickAddClass() {
      let btns = document.querySelectorAll(".tips-container button");

      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          inputCustom.value = "";

          if (e.target.className === "") {
            [...btn.parentElement.children].forEach((sib) =>
              sib.classList.remove("active")
            );
            btn.classList.add("active");
          } else if (e.target.className === "active") {
            e.target.classList.remove("active");
          }
        });
      });

      inputCustom.addEventListener("input", () => {
        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
      });
    }

    tipAmoutOnePerson(percent) {
      let result =
        ((this.inputBill.value / 100) * percent) / this.inputPeople.value;

      return parseFloat(result).toFixed(2);
    }

    totalOnePerson(percent = 0) {
      let result = (this.inputBill.value / 100) * percent;
      let resultPerOne =
        (+result + +this.inputBill.value) / this.inputPeople.value;

      return parseFloat(resultPerOne).toFixed(2);
    }

    resetOnClick() {
      let total = document.querySelector("p.total-person");
      let errorMessage = document.querySelector("h4.error-message"),
        tipAmout = document.querySelector("p.tip-amount"),
        btns = document.querySelectorAll(".tips-container button");

      resetBtn.addEventListener("click", () => {
        inputCustom.value = "";
        inputBill.value = "";
        inputPeople.value = "";
        resetBtn.classList.remove("reset");

        total.textContent = "$0.00";

        tipAmout.textContent = "$0.00";

        errorMessage.style.display = "none";
        inputPeople.classList.remove("error");
        inputPeople.classList.add("hover-input");

        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
      });
    }

    inputsOn() {
      this.validateInputPeople();
      this.clickAddClass();
      this.validateInputBill();
      this.resetOnClick();
      this.validateInputCustom();

      let inputsArr = [];
      let debounceTimer;
      let total = document.querySelector("p.total-person");
      let errorMessage = document.querySelector("h4.error-message"),
        tipAmout = document.querySelector("p.tip-amount");

      let percent = 0;

      inputCustom.addEventListener("click", () => {
        percent = 0;
      });

      let btns = document.querySelectorAll(".tips-container button");

      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          if (e.target.matches("button.active")) {
            percent = e.target.textContent.replace("%", "");
          }

          if (e.target.className === "") {
            percent = 0;
          }

          clearTimeout(debounceTimer);

          debounceTimer = setTimeout(() => {
            if (!this.inputBill.value || !this.inputPeople.value) {
              total.textContent = "$0.00";

              tipAmout.textContent = "$0.00";

              errorMessage.style.display = "none";
              inputPeople.classList.remove("error");
              inputPeople.classList.add("hover-input");

              resetBtn.classList.remove("reset");
            } else if (this.inputBill.value > 0 && this.inputPeople.value > 0) {
              total.textContent = `$${this.totalOnePerson(
                percent || inputCustom.value
              )}`;

              tipAmout.textContent = `$${this.tipAmoutOnePerson(
                percent || inputCustom.value
              )}`;

              errorMessage.style.display = "none";
              inputPeople.classList.remove("error");
              inputPeople.classList.add("hover-input");

              resetBtn.classList.add("reset");
            } else if (
              (inputPeople.value <= 0 && this.inputBill.value > 0) ||
              this.inputBill.value < 0
            ) {
              errorMessage.style.display = "block";
              errorMessage.textContent = `Can't be zero`;
              inputPeople.classList.add("error");
              inputPeople.classList.remove("hover-input");

              resetBtn.classList.add("reset");
            }
          }, 50);
        });
      });

      inputsArr.push(this.inputBill, this.inputPeople, this.inputCustom);

      inputsArr.forEach((input) => {
        input.addEventListener("input", () => {
          clearTimeout(debounceTimer);

          debounceTimer = setTimeout(() => {
            if (!this.inputBill.value || !this.inputPeople.value) {
              total.textContent = "$0.00";

              tipAmout.textContent = "$0.00";

              errorMessage.style.display = "none";
              inputPeople.classList.remove("error");
              inputPeople.classList.add("hover-input");

              resetBtn.classList.remove("reset");
            } else if (this.inputBill.value > 0 && this.inputPeople.value > 0) {
              total.textContent = `$${this.totalOnePerson(
                percent || inputCustom.value
              )}`;

              tipAmout.textContent = `$${this.tipAmoutOnePerson(
                percent || inputCustom.value
              )}`;

              errorMessage.style.display = "none";
              inputPeople.classList.remove("error");
              inputPeople.classList.add("hover-input");

              resetBtn.classList.add("reset");
            } else if (
              (inputPeople.value <= 0 && this.inputBill.value > 0) ||
              this.inputBill.value < 0
            ) {
              errorMessage.style.display = "block";
              errorMessage.textContent = `Can't be zero`;
              inputPeople.classList.add("error");
              inputPeople.classList.remove("hover-input");

              resetBtn.classList.add("reset");
            }
          }, 250);
        });
      });
    }
  }

  let calculator = new tipCalculator(
    inputBill,
    inputPeople,
    inputCustom,
    resetBtn
  );

  calculator.inputsOn();
}
