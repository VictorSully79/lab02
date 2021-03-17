WierdCreatures.allCreatures = [];
const creatureTemplate = $('#mustache-template').html();
const jsonOne = 'data/page-1.json';
const jsonTwo = 'data/page-2.json';
const creatureObjects = [];
const creatureOptions = {};
var jsonFile = jsonOne;
let buttonOneClicked = false;
let buttonTwoCLicked = false;
let dropDownMenu = false;
let currentPage = 1;

Mustache.parse(creatureTemplate);

function WierdCreatures(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

WierdCreatures.prototype.removeWierdCreature = function(){
  const $h2 = $('<h2></h2>').text(this.title);
  const $image = $('<img></img>').attr('src', this.url);
  const $p = $('<p></p>').text(this.description);
  $('body > div.entry').hide();
};

const resetPage = () => {
  buttonOneClicked = !buttonOneClicked;
  buttonTwoClicked = !buttonTwoClicked;
  creatureObjects.forEach(creature => {
    creature.removeWierdCreature();
  });
  dropDownMenu = false;
  parseJson();

};

$(document).ready(function() {
  $('button:first-of-type').on('click', function(){
    buttonOneClicked = true;
    if(currentPage > 1 & buttonOneClicked) {
      currentPage = 1;
      jsonFile = jsonOne;
      resetPage();
    }
 })
 $('button:nth-of-type(2)').on('click', function() {
   buttonTwoCLicked = true;
   if(currentPage < 2 & buttonTwoCLicked) {
     currentPage = 2;
     jsonFile = jsonTwo;
     resetPage();
   })
 })

 const parseJson = () => {
   $.ajax(jsonFile, {
     success:function(response)
     {
       extractJsonData(response);
     },
     error: function (req, status, error)
     {
       console.log('Json did not parse', status, error);
     }
    });
 };

 parseJson();
 populateDropdown(creatureObjects);
 function extractJsonData(jsonInfo) {
   let tempCreature = new WierdCreatures(creature.image_url, creature.title, creature.description, creature.keyword, creature.horns);
   if(!creatureObjects.includes(tempCreature)) {
     creatureObjects.push(tempCreature);
   }
 });
 creatureObjects.forEach(function(creature)
 { creature.renderWithJqueryAndMustache();
 });

 if(dropDownMenu === false) {
   populateDropdown(creatureObjects);
   dropDownMenu = true;
 }

 function populateDropdown(creatureObjects) {
   creatureObjects.forEach(creature => {
     let optionText = creature.keyword.toString().charAt(0).toUpperCase() + creature.keyword.slice(1);
     let optionValue = creature.keyword;
     const $option = new Option(optionText, optionValue);
     value++;
     $newOption.setAttribute('keyword',objKeys[key]);
     $newOption.setAttribute('id',objKeys[key]);    
     $newOption.setAttribute('selected','selected'); 
     $('select').append($newOption);

   })
 }

 $('#select').change(function(){
  $('select option:selected').each(function(){
    console.log(this);
    console.log($(this).text())
    let target = this;
    displayEntry(target);
  });
});

function displayEntry(target) {
  let keyword = $(target).attr('keyword');
  let creaturesToDisplay = [];
  creatureObjects.forEach(entry => {
    if(entry.keyword === keyword)
    {
      creaturesToDisplay.push(entry);
      entry.removeWierdCreature();
    };
  });
  creaturesToDisplay.forEach(entry => {
    entry.renderWithJqueryAndMustache();
  });
};

WierdCreatures.prototype.renderWithJqueryAndMustache = function() {
  const templateOutput = Mustache.render(creatureTemplate, this);
  $('body').append(templateOutput);
};