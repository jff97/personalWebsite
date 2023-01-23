class SkillInfo {
   badgeUrl 
   skillLvl
   descriptionTxt
   constructor(badge, skill, desc) {
      this.badgeUrl = badge
      this.skillLvl = skill
      this.descriptionTxt = desc
   }
}


function initSkills(skills) {
   //for every skill in the global skills list array
   for (let i = 0; i < skills.length ; i++) {
      addSkillBadge(skills[i], i)
   }
}

function displaySkillBar(numOutOf10) {
   document.getElementById("alignBar").style.zIndex = 1
   let percent = Math.round(numOutOf10) / 10
   let widthVal = (percent * 100) + "%"
   let innerBarFill = document.getElementById("innerBarFill")
   innerBarFill.style.width = widthVal
   document.getElementById("skillNum").innerHTML = numOutOf10 + "/10"
}

function displayDescription(txt) {
   document.getElementById("description").innerHTML = txt
}
function addSkillBadge(skill, skillNum) {
   let badgesBox = document.getElementById("badges")

   let toAdd = document.createElement("div")
   toAdd.className = "aBadge"

   let badgeImg = document.createElement("img")
   badgeImg.src = skill.badgeUrl
   badgeImg.onclick = function() {clickBadge(skillNum)}
   toAdd.appendChild(badgeImg)

   let whiteCircle = document.createElement("div")
   whiteCircle.className = "whiteCircle"
   //toAdd.appendChild(whiteCircle)
   
   badgesBox.appendChild(toAdd)
}

function clickBadge(badgeNum) {
   displaySkillBar(skillsList[badgeNum].skillLvl);
   displayDescription(skillsList[badgeNum].descriptionTxt);
}



//driver
//to add a skill copy template and fill out the three parameters
let skillsList = new Array()
let url
let lvl
let description

//template
url = "https://github.com/Ileriayo/markdown-badges"
lvl = 11
description = "description of my skills"
//skillsList.push(new SkillInfo(url, lvl, description))

//C programming language skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/c/c.png"
url = "https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
lvl = 1
description = "UWL's upper level Computer Science courses are taught in C."
skillsList.push(new SkillInfo(url, lvl, description))

//CSS3 skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"
url = "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"
lvl = 2
description = "Big fan of flexBox, Familiar with: mobile first design, breakpoints, root variables, animations and transitions, fontawesome icons, pseudo selectors."
skillsList.push(new SkillInfo(url, lvl, description))

//HTML5 skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png"
url = "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
lvl = 3
description = "description of my html skills"
skillsList.push(new SkillInfo(url, lvl, description))

//JAVA skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png"
url = "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white"
lvl = 4
description = "Java is my strongest language. I have taken 4 courses at UWL in Java. Software Design I-III and part of Programming Language Constructs CS 421."
skillsList.push(new SkillInfo(url, lvl, description))

//JAVASCRIPT skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"
url = "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
lvl = 5
description = "description of my javscript skill"
skillsList.push(new SkillInfo(url, lvl, description))

//LATEX skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/latex/latex.png"
url = "https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white"
lvl = 6
description = "description of my latex skill"
skillsList.push(new SkillInfo(url, lvl, description))

//PYTHON skill
//url = "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png"
url = "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
lvl = 7
description = "description of my python skills"
skillsList.push(new SkillInfo(url, lvl, description))


initSkills(skillsList)