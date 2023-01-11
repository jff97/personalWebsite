class Point {
   constructor(x, y) {
      this.x = x
      this.y = y
   }

   //returns the euclidian distance between the 2 points pt1 and pt2
   static distance(pt1, pt2) {
      let xDiff = pt1.x - pt2.x
      let yDiff = pt1.y - pt2.y
      return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
   }

   //returns a string representing the coordinate pair (point)
   toString() {
      return "{(" + this.x + " ," + this.y + ")}"
   }
}