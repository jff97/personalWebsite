class Circle extends Shape {
  #centerPoint
  #radius
  color

  constructor(cntrPt, rad, c = "blue") {
    super()
    this.#centerPoint = cntrPt
    this.#radius = rad
    this.color = c
  }

  //returns a circle where all points on the circle are within the pageDim
  //and the diameter of the circle is within the maxSize limit
  static makeRandCircle(minDia = 1, maxDia = gui.getMaxSize()) {
    //make the radius in the range [minDia/2, maxDia / 2]
    let radius = (minDia + (Math.random() * (maxDia - minDia))) / 2
    //make the x and y center coordinates in the range [0 + radius, PAGEDIM - radius]
    let xCenter = radius + (Math.random() * (gui.getPageDim() - (2 * radius)))
    let yCenter = radius + (Math.random() * (gui.getPageDim() - (2 * radius)))
    let centerPt = new Point(xCenter, yCenter)
    return new Circle(centerPt, radius)
 }

  //returns the center of the circle as a point obj
  center() {
    return this.#centerPoint
  }

  //returns the radius of the circle as a point obj
  getRad() {
    return this.#radius
  }

  //returns the farthest point in this shape from point pt
  farthestFrom(pt) {
    //get the adjacent side of the triangle
    let xDiff = this.#centerPoint.x - pt.x
    //get the opposide side of the triangle
    let yDiff = this.#centerPoint.y - pt.y
    //get the angle between the distance vector and the x axis 
    let thetaRad = Math.atan(Math.abs(yDiff / xDiff))

    //get the components of the unit vector in the direction of pt to center of this circle
    let unitXComp = Math.cos(thetaRad) * Math.sign(xDiff)
    let unitYComp = Math.sin(thetaRad) * Math.sign(yDiff) 

    //extend both of the center coordinates of this circle to the opposite side
    let xReturn = this.#centerPoint.x + (unitXComp * this.#radius)
    let yReturn = this.#centerPoint.y + (unitYComp * this.#radius)
    return new Point(xReturn, yReturn)
  }

  //returns the minimum x coordinate located in this shape
  minX() {
    return this.#centerPoint.x - this.#radius
  }
  //returns the minimum y coordinate located in this shape
  minY() {
    return this.#centerPoint.y - this.#radius
  }

  //returns the maximum x coordinate located in this shape
  maxX() {
    return this.#centerPoint.x + this.#radius
  }

  //returns the maximum y coordinate located in this shape
  maxY() {
    return this.#centerPoint.y + this.#radius
  }

  //returns the area of the shape as a double
  area() {
    //A = pi * r^2
    return Math.pow(this.#radius, 2) * Math.PI
  }

  //returns false if the point is not within this shape
  //returns true if the point is within including the border this shape
  contains(pt) {
    //find the distance between the center of the circle and the point
    let ptDist = Math.sqrt(Math.pow(pt.x - this.#centerPoint.x, 2) + Math.pow(pt.y - this.#centerPoint.y, 2))
    return ptDist <= this.#radius
  }

  toString() {
    return "{Circle= (" + this.#centerPoint.x + ", " + this.#centerPoint.y + "), rad = "+ this.#radius+"}"
  }

  //parameter type: a string either "leaf" or "nonleaf" indicating the style apply to the shape when printing
  //returns a string representing a single circle shape corresponding to this
  shapeSvg(type) {
    let style = gui.getShapeStyle(type)
    let centerPt = this.center()
    return "<circle cx=\"" + centerPt.x + "\" cy=\"" + centerPt.y + "\" r=\"" + this.#radius + "\" style=\"" + "fill:" + this.color + ";" + style + "\" />\n"
  }
}
