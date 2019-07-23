const URL = "http://us-central1-comsoc-backend.cloudfunctions.net/sendEmail/";
export function getFormData(form) {
  const data = {};
  const els = form.elements;

  for (const el of els) {
    if (el.name) {
      data[el.name] = el.value;
    }
  }

  return data;
}

export function submitData(data) {
  return fetch(URL, {
    method: "post",
    // mode: "no-cors",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}