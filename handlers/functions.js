module.exports = (client) => {

function handlemsg(txt, options) {
    let text = String(txt);
    for (const option in options) {
      var toreplace = new RegExp(`{${option.toLowerCase()}}`, "ig");
      text = text.replace(toreplace, options[option]);
    }
    return text;
  }
  module.exports.handlemsg = handlemsg;
}
