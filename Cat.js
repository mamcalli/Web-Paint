class Cat{
    constructor(){
      this.type='cat';
      this.position=[0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.size = 5.0;
    }
  
    render() {
        // draw cat
        // cat head
        gl.uniform4f(u_FragColor, 1.0, 0.7, 0.0, 1.0); // color
        drawTriangle( [0.0, 0.0,   0.0, 0.5,   0.5, 0.0] );
        drawTriangle( [0.0, 0.0,   0.0, -0.3,   0.5, 0.0] );
        drawTriangle( [0.0, 0.0,   0.0, -0.3,   -0.5, 0.0] );
        drawTriangle( [0.0, 0.0,   0.0, 0.5,   -0.5, 0.0] );
        drawTriangle( [-0.5, 0.0,  -0.5, 0.3,  -0.2, 0.3]);
        drawTriangle( [0.5, 0.0,  0.5, 0.3,  0.2, 0.3]);
        drawTriangle( [0.3, 0.2,  0.0, 0.5, 0.3, 0.5]);
        drawTriangle( [-0.3, 0.2,  0.0, 0.5, -0.3, 0.5]);
        drawTriangle( [-0.3, 0.3, -0.5, 0.3, -0.3, 0.5]);
        drawTriangle( [0.3, 0.3, 0.5, 0.3, 0.3, 0.5]);
        drawTriangle( [0.3, 0.5, 0.1, 0.5, 0.3, 0.7]);
        drawTriangle( [-0.3, 0.5, -0.1, 0.5, -0.3, 0.7]);
        
        // inside ears
        gl.uniform4f(u_FragColor, 1.0, 0.4, 0.0, 1.0); // color
        drawTriangle([0.12, 0.5, 0.27, 0.60, 0.27, 0.5]);
        drawTriangle([-0.12, 0.5, -0.27, 0.60, -0.27, 0.5]);
        
        // cat mouth
        gl.uniform4f(u_FragColor, 0.7, 0.7, 0.7, 1.0); // color
        drawTriangle( [0.0, 0.0, 0.0, 0.25, 0.25, 0.0] );
        drawTriangle( [0.0, 0.0, 0.0, -0.15, 0.25, 0.0] );
        drawTriangle( [0.0, 0.0, 0.0, -0.15, -0.25, 0.0] );
        drawTriangle( [0.0, 0.0, 0.0, 0.25, -0.25, 0.0] );
        drawTriangle( [-0.25, 0.0, -0.25, 0.15, -0.1, 0.15])
        drawTriangle( [0.25, 0.0, 0.25, 0.15, 0.1, 0.15])
        
        // nose
        gl.uniform4f(u_FragColor, 1.0, 0.6, 0.6, 1.0); // color
        drawTriangle( [0.0, 0.15, 0.0, 0.05, 0.15, 0.15]);
        drawTriangle( [0.0, 0.15, 0.0, 0.05, -0.15, 0.15]);
        
        //whiskers
        gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0); // color
        // right side
        drawTriangle( [0.1, 0.15, 0.55, 0.25, 0.55, 0.22] );
        drawTriangle( [0.1, 0.15, 0.55, 0.04, 0.55, 0.01] );
        drawTriangle( [0.1, 0.15, 0.59, 0.15, 0.55, 0.11] );
        // left side
        drawTriangle( [-0.1, 0.15, -0.55, 0.25, -0.55, 0.22] );
        drawTriangle( [-0.1, 0.15, -0.55, 0.04, -0.55, 0.01] );
        drawTriangle( [-0.1, 0.15, -0.59, 0.15, -0.55, 0.11] );
        
        //eyes
        gl.uniform4f(u_FragColor, 0.3, 1.0, 0.3, 1.0); // color
        //right
        drawTriangle( [0.1, 0.3, 0.2, 0.35, 0.3, 0.3] );
        drawTriangle( [0.1, 0.3, 0.2, 0.25, 0.3, 0.3] );
        //left
        drawTriangle( [-0.1, 0.3, -0.2, 0.35, -0.3, 0.3] );
        drawTriangle( [-0.1, 0.3, -0.2, 0.25, -0.3, 0.3] );
    }
  
}