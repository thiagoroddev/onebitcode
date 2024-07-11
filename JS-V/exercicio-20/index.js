import { Component } from "./Component.js";
import { Form } from "./Form.js";
import { Input } from "./input.js";
import { Label } from "./label.js";

const tittle = new Component("h1", "body", { textContent: "Olá" });
console.log(tittle);
tittle.render();

tittle.tag = "h3";

tittle.build().render();

const form = new Form("body");

const label = new Label("Nome:", form, { htmlFor: "nameInput" });
const input = new Input(form, { id: "nameinput", name: "nome" });

form.render();
label.render();

form.render();
label.render();

form.addChildren(input);

form.addChildren(
  new Component("br"),
  new Component("br"),
  new Label("Data de nascimento: ", form, { htmlFor: "birthdayinput" }),
  new Input(form, { id: "birthdayinput", name: "birthday", type: "date" })
);
