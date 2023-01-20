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

//driver
//to add a skill copy template and fill out the three parameters
let skillsList = new Array()
let url
let lvl
let description

//template
url = "https://github.com/Ileriayo/markdown-badges"
lvl = 11
description = "description of my skill"
//skillsList.push(new SkillInfo(url, lvl, description))

//C programming language skill
url = "https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//CSS3 skill
url = "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//HTML5 skill
url = "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//JAVA skill
url = "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//JAVASCRIPT skill
url = "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//LATEX skill
url = "https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

//PYTHON skill
url = "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
lvl = 11
description = "description of my skill"
skillsList.push(new SkillInfo(url, lvl, description))

function initSkills() {
   //for every skill in the global skills list array
   for (let i = 0; i < skillsList.length; i++) {
      //generate the skill box
      //add it to the badges container
   }

   //set the lvl and description containers info to 
   //"click a skill to see more" or something like that
}