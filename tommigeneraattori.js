const thoughts = [
    'Pitäisiköhän',
    'Koskahan sitä viitsisi',
    'Milloinkohan sitä voisi',
    'Muistakaa',
    'Tänään pitää',
    'Jahha täytyy',
    'Täytyypä',
    'Pitääpä',
    'Kohta saa',
];
const how = [
    'kävellä',
    'pyöräillä',
    'ryömiä',
    'kikkailla',
    'siirtyä',
    'mennä',
    'lähteä',
];
const what = [
    'kauppaan',
    'salille',
    'ostoksille',
    'kokkaamaan',
    'tarkistamaan virtsan väri',
    'tekemään SETIT',
    'lepäämään',
    'penkkaamaan',
    'kyykkäämään',
    'juomaan maitua',
    'tammiston cittariin',
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const tommigeneraattori = (ctx) => {
    ctx.reply(`${getRandomItem(thoughts)} ${getRandomItem(how)} ${getRandomItem(what)}`);
};

module.exports = tommigeneraattori;
