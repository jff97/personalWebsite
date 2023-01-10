class Rectangle extends Shape {
   #topLeftPt
   #bottomRightPt
   color

   constructor(topLeft, bottomRight, c = "red") {
      super()
      this.#topLeftPt = topLeft
      this.#bottomRightPt = bottomRight
      this.color = c
   }

   //returns a rectangle where all points on the circle are within the pageDim
   //and the width and height are within the maxSize limit
   static makeRandRect(minWidth = 1, minHeight = 1, maxWidth = gui.getMaxSize(), maxHeight = gui.getMaxSize()) {
      //make width and height in the range [1, MAXSIZE]
      let width = minWidth + (Math.random() * (maxWidth - minWidth))
      let height = minHeight + (Math.random() * (maxHeight - minHeight))
      //make x y in the range [0, PAGEDIM - width or height]
      let x = Math.random() * (gui.getPageDim() - width)
      let y = Math.random() * (gui.getPageDim() - height)
      //make the 2 points corresponding to the rectangles opposite corners
      let topLeftPt = new Point(x, y)
      let bottomRightPt = new Point(x + width, y + height)
      //make a shape from the 2 points
      return new Rectangle(topLeftPt, bottomRightPt)
   }
   
   //returns the center of the shape as a point
   center() {
      let xCenter = (this.#bottomRightPt.x + this.#topLeftPt.x) / 2
      let yCenter = (this.#bottomRightPt.y + this.#topLeftPt.y) / 2
      return new Point(xCenter, yCenter)
   }

   //returns the farthest point in this shape from point pt
   farthestFrom(pt) {
      //generate the 2 points not explicitely saved
      let bottomLeftPt = new Point(this.#topLeftPt.x, this.#bottomRightPt.y)
      let topRightPt = new Point(this.#bottomRightPt.x, this.#topLeftPt.y)
      
      //find the distances between all 4 points of the 
      let topLeftDist = Math.sqrt(Math.pow(pt.x - this.#topLeftPt.x, 2) + Math.pow(pt.y - this.#topLeftPt.y, 2))
      let bottomRightDist = Math.sqrt(Math.pow(pt.x - this.#bottomRightPt.x, 2) + Math.pow(pt.y - this.#bottomRightPt.y, 2))
      let bottomLeftDist = Math.sqrt(Math.pow(pt.x - bottomLeftPt.x, 2) + Math.pow(pt.y - bottomLeftPt.y, 2))
      let topRightDist = Math.sqrt(Math.pow(pt.x - topRightPt.x, 2) + Math.pow(pt.y - topRightPt.y, 2))
      
      //return the point associated with the greatest distance
      let maxDistance = Math.max(topLeftDist, bottomRightDist, bottomLeftDist, topRightDist)
      if (maxDistance == topLeftDist) {
         return this.#topLeftPt
      } else if (maxDistance == bottomRightDist) {
         return this.#bottomRightPt
      } else if (maxDistance == bottomLeftDist) {
         return bottomLeftPt
      } else if (maxDistance == topRightDist) {
         return topRightPt
      } else {
         throw 'farthestFrom() error'
      }
   }

   //return the width of the rectangle
   width() {
      return this.#bottomRightPt.x - this.#topLeftPt.x
   }

   //return the height of the rectangle 
   height() {
      return this.#bottomRightPt.y - this.#topLeftPt.y
   }
   //returns the minimum x coordinate located in this shape
   minX() {
      return this.#topLeftPt.x
   }
   //returns the minimum y coordinate located in this shape
   minY() {
      return this.#topLeftPt.y
   }

   //returns the maximum x coordinate located in this shape
   maxX() {
      return this.#bottomRightPt.x
   }

   //returns the maximum y coordinate located in this shape
   maxY() {
      return this.#bottomRightPt.y
   }

   //returns the area of this rectangle
   area() {
      let width = this.#bottomRightPt.x - this.#topLeftPt.x
      let height = this.#bottomRightPt.y - this.#topLeftPt.y
      return width * height
   }

   //returns false if any pt is outside the rectangle
   //returns true if the point is within the rectangle including the border
   contains(pt) {
      let thresh = .01
      let isInXRange = Math.abs(pt.x - this.minX()) < (thresh * this.width()) && Math.abs(pt.y - this.minY()) < (thresh * this.width())
      let isInYRange = Math.abs(pt.x - this.maxX()) < (thresh * this.height()) && Math.abs(pt.y - this.maxY()) < (thresh * this.height())
      return  isInXRange && isInYRange 
   }

   //returns a string with the relavent info in the rectangle
   toString() {
      return "{Rect= (" + this.#topLeftPt.x + ", " + this.#topLeftPt.y + ") (" + this.#bottomRightPt.x + ", " + this.#bottomRightPt.y + ")}"
   }

   //parameter type: a string either "leaf" or "nonleaf" indicating the style apply to the shape when printing
   //returns a string representing a single rectangle shape corresponding to this
   shapeSvg(type) {
      let style = gui.getShapeStyle(type)
      let x = this.minX()
      let y = this.minY()
      let width = this.width()
      let height = this.height()
      return "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"" + "fill:" + this.color + ";" + style + "\" />\n"
   }
}