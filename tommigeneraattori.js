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

const lausahdukset = [
    'Kohta on palkkapäivä',
    'Koska pääsee salille',
    'Halmela se vaan pötköttelee',
    'Kohta tulee seTIT',
    'Kohtahan se on tilipäivä',
    'Pihvejä kanajauheliha pedillä',
    'Vastatkaa VÄLITTÖMÄSTI!',
    'En ikinä',
    'HPPH',
    'Ai että',
    'Sinä senkin',
    'Pitää optimoida virtsan väri',
    'Sellaset vauva-gear setit',
    'Ei vauvasuille',
    'Maitua maitua!',
    'Laitanpa nugetit pöhöttimeen',
    'Laitanpa kanat pöhöttimeen',
    'seTIT',
    'Kohta pääsee salille',
    'Piti mennä pötköttelemään',
    '160km/h konsulttielämää',
    'Pöhötinpullat ai että',
    'Ei ole möykkäpäivä',
    'Kaikista ei ole 120km/h konsultin elämään',
    'Kohta on palkkapäivä'
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const randomNumber = () => Math.floor(Math.random() * 10);

const tommigeneraattori = (ctx) => {
    if (randomNumber() > 3) {
        ctx.reply(`${getRandomItem(lausahdukset)}`);
    } else {
        ctx.reply(`${getRandomItem(thoughts)} ${getRandomItem(how)} ${getRandomItem(what)}`);
    }
};

module.exports = tommigeneraattori;
