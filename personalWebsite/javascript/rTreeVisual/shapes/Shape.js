class Shape {
   //returns a 
   static makeRand(thresh = .5) {
      //return Rectangle.makeRandRect()
      if (Math.random() < thresh) {
         return Circle.makeRandCircle()
      } else {
         return Rectangle.makeRandRect()
      }
   }
   
   //returns the euclidian distance between the centers of any 2 shapes
   distance(otherShape) {
      let xDist = otherShape.center().x - this.center().x
      let yDist = otherShape.center().y - this.center().y
      return Point.distance(otherShape.center(), this.center())
   }

   //returns a new Rectangle that minimally contains this shape and otherShape
   combineToRect(otherShape) {
      //generate the bounding box by getting the min and max coordinates of the x and y
      let minXCoord = Math.min(this.minX(), otherShape.minX())
      let maxXCoord = Math.max(this.maxX(), otherShape.maxX())
      let minYCoord = Math.min(this.minY(), otherShape.minY())
      let maxYCoord = Math.max(this.maxY(), otherShape.maxY())
      let topLeftPt = new Point(minXCoord, minYCoord)
      let bottomRightPt = new Point(maxXCoord, maxYCoord)
      return new Rectangle(topLeftPt, bottomRightPt)
   }

   //returns a new Circle that minimally contains this shape and otherShape
   //the first algorithm used in this process is very fast but sometimes produces errors
   //so in some cases wenzls algorithm is used to patch these errors
   //this is done at the end of this method by the call to patchCircle
   combineToCircle(otherShape) {
      //determine if one shape is inside the other allready
      //if that is the case return the shape of the bigger one
      let bothCir = this instanceof Circle && otherShape instanceof Circle
      if (bothCir && this.encloses(otherShape)) {
         return this
      } else if (bothCir && otherShape.encloses(this)) {
         return otherShape
      } else {
         let farthestPoint1 
         let farthestPoint2 
         //the next three if blocks all share same idea
         if (this instanceof Circle && otherShape instanceof Rectangle) {
            farthestPoint1 = otherShape.farthestFrom(this.center())
            farthestPoint2 = this.farthestFrom(farthestPoint1)
         } else {
            //then this is a rectangle and otherShape is a circle
            //or both shapes are the same type
            //either way the order in which to find the farthest points is the same
            farthestPoint1 = this.farthestFrom(otherShape.center())
            farthestPoint2 = otherShape.farthestFrom(farthestPoint1)
         } 

         //generate the components of the containing circle
         let radiusLen = Point.distance(farthestPoint1, farthestPoint2) / 2
         let newCenterX = (farthestPoint1.x + farthestPoint2.x) / 2
         let newCenterY = (farthestPoint1.y + farthestPoint2.y) / 2
         let newCenterPt = new Point(newCenterX, newCenterY)
         //make the containing circle
         let toReturn = new Circle(newCenterPt, radiusLen)
         //re make the circle if it isnt a valid circle
         toReturn = toReturn.patchCircle(this, otherShape)
         return toReturn
      }
   }

   //returns a list of point objects corresponding to the corners of the 
   //rectangular bounding box surrounding this shape
   getCornerPts() {
      let left = this.minX()
      let right = this.maxX()
      let top = this.minY()
      let bottom = this.maxY()
      //make the 4 points on the rectangle
      let leftTop = new Point(left, top)
      let rightTop = new Point(right, top)
      let leftBottom = new Point(left, bottom)
      let rightBottom = new Point(right, bottom)
      return new Array(leftTop, rightTop, leftBottom, rightBottom)
   }

   //Parameter rect: a shape object to generate key points from
   //Parameter cir: a shape object to generate key points from
   //returns a list of point objects corresponding to the 4 corners of the rectangle
   //and the farthest 4 points on the circle from each of those 4 corners of the rectangle respectively
   static genPoints(rect, cir) {
      //put every point in the rectangle in the array
      let toReturn = rect.getCornerPts()
      //for every point on the rectangle add the farthest point on the circle to the array
      let cirPts = new Array()
      for (let i = 0; i < toReturn.length; i++) {
         cirPts.push(cir.farthestFrom(toReturn[i]))
      }
      toReturn.push(...cirPts)
      return toReturn
   }

   //return true if all of the child shape is inside the this circle
   //return false if any part of the child shape is outside the this circle
   encloses(child) {
      if (this instanceof Rectangle) {
         alert("rectangle where it shouldnt be")
      }
      if (child instanceof Rectangle) {
         let rectPoints = child.getCornerPts()
         //return if every corner of child rect is within parent circle
         return this.contains(rectPoints[0]) && this.contains(rectPoints[1]) && this.contains(rectPoints[2]) && this.contains(rectPoints[3])
      } else if (child instanceof Circle) {
         //get the distance between the centers of the circles
         let centersDist = Point.distance(this.center(), child.center())
         //if the distance between the centers + the child radius is less then the parent radius then 
         //no part of the child can be outside the parent
         return centersDist + child.getRad() - this.getRad() <= 0.001
      }
   }

   //this method checks if this shape is a valid containing shape for shape1 and 
   //shape2 it uses wenzls algorithm if it isnt a valid shape
   patchCircle(shape1, shape2) {
      let pointsToBuild = new Array()
      if (this.encloses(shape1) && this.encloses(shape2)) {
         //then return parent because it is allready fine
         return this
      } else if (shape1 instanceof Rectangle && shape2 instanceof Circle) {
         //add all 4 points on the rectangle
         //add all 4 points on the circle farthest from each point on rect
         pointsToBuild = Shape.genPoints(shape1, shape2)
      } else if (shape1 instanceof Circle && shape2 instanceof Rectangle) {
         //add all 4 points on the rectangle
         //add all 4 points on the circle farthest from each point on rect
         pointsToBuild = Shape.genPoints(shape2, shape1)
      } else if (shape1 instanceof Rectangle && shape2 instanceof Rectangle) {
         //add the 8 points of the rectangle
         pointsToBuild = shape1.getCornerPts()
         let rectPts2 = shape2.getCornerPts()
         for (let i = 0; i < rectPts2.length; i++) {
            pointsToBuild.push(rectPts2[i])
         }
      } else if (shape1 instanceof Circle && shape2 instanceof Circle) {
         alert("2 circles are not contained by their parent\ncircles are "  + shape1 + " and " + shape2 + "\n parent is " + this)
      }
      //make a corcle object which is the 
      let encCorcle = makeCorcle(pointsToBuild)
      return new Circle(new Point(encCorcle.x, encCorcle.y), encCorcle.r)
   }
}