package trianglesExample;

public class Triangle {

	private float height;
	private float width;
	private float area;
	
	public Triangle(float height, float width) {
		this.height = height;
		this.width = width;
	}
	
	public void calculateArea() {
		this.area = (height*width)/2;
		System.out.println("Area del triangulo: "+ area);
	}

	public float getHeight() {
		return height;
	}
	public float getWidth() {
		return width;
	}
	
	public float getArea() {
		return area;
	}
}