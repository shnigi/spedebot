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
    'Taidanpa',
    'Taidan',
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
    'dominoimaan splitgate kenttiä',
    'saunaan',
    'splitgateen',
    'vetämään mömmöt',
    'tekemään klarnalasku',
    'tilaamaan kanakebab ilman kastiketta',
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const tommigeneraattori = (ctx) => {
    ctx.reply(`${getRandomItem(thoughts)} ${getRandomItem(how)} ${getRandomItem(what)}`);
};

module.exports = tommigeneraattori;
