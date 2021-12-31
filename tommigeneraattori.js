const thoughts = ['Pitäisköhän', 'Koskahan sitä viitsisi', 'Milloin sitä voisi', 'Muistakaa', 'Tänään pitää', 'Jahha täytyy'];
const how = ['kävellä', 'pyöräillä', 'ryömiä', 'kikkailla', 'siirtyä'];
const what = [
    'kauppaan',
    'salille',
    'ostoksille',
    'kokkaamaan',
    'tarkistamaan virtsan väri',
    'tekemään SETIT',
    'lepäämään',
    'penkkaamaan',
    'kyykkäämään'];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const tommigeneraattori = (ctx) => {
    ctx.reply(`${getRandomItem(thoughts)} ${getRandomItem(how)} ${getRandomItem(what)}`);
};

module.exports = tommigeneraattori;
