/*******************************************************************************
#      ____               __          __  _      _____ _       _               #
#     / __ \              \ \        / / | |    / ____| |     | |              #
#    | |  | |_ __   ___ _ __ \  /\  / /__| |__ | |  __| | ___ | |__   ___      #
#    | |  | | '_ \ / _ \ '_ \ \/  \/ / _ \ '_ \| | |_ | |/ _ \| '_ \ / _ \     #
#    | |__| | |_) |  __/ | | \  /\  /  __/ |_) | |__| | | (_) | |_) |  __/     #
#     \____/| .__/ \___|_| |_|\/  \/ \___|_.__/ \_____|_|\___/|_.__/ \___|     #
#           | |                                                                #
#           |_|                 _____ _____  _  __                             #
#                              / ____|  __ \| |/ /                             #
#                             | (___ | |  | | ' /                              #
#                              \___ \| |  | |  <                               #
#                              ____) | |__| | . \                              #
#                             |_____/|_____/|_|\_\                             #
#                                                                              #
#                              (c) 2010-2011 by                                #
#           University of Applied Sciences Northwestern Switzerland            #
#                           martin.christen@fhnw.ch                            #
********************************************************************************

This file is part of the OpenWebGlobe SDK

GPL LICENSE

i3D OpenWebGlobe SDK is free software: you can redistribute it and/or modify  it
under the  terms of  the GNU  General Public  License as  published by  the Free
Software Foundation, either version  2 of the License,  or (at your option)  any
later version.

i3D OpenWebGlobe  SDK is  distributed in  the hope  that it  will be useful, but
WITHOUT ANY WARRANTY;  without even the  implied warranty of  MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See  the GNU General Public License for  more
details.

You should have received a copy of the GNU General Public License along with i3D
OpenWebGlobe SDK.  If not, see <http://www.gnu.org/licenses/>.

Commercial License

OEMs (Original  Equipment Manufacturers),  ISVs (Independent  Software Vendors),
VARs (Value Added Resellers) and other distributors that combine and  distribute
commercially licensed  software with  i3D OpenWebGlobe  SDK and  do not  wish to
distribute the source code for the commercially licensed software under  version
2 of the  GNU General Public  License (the "GPL")  must enter into  a commercial
license agreement with the Institute of Geomatics Engineering at the  University
of Applied Sciences Northwestern Switzerland (FHNW).
*******************************************************************************/

// Constructor
// mat4(string type)     with type "double", "float" or "native". Matrix is initialized with identity.
// Set(array mat)        mat is an array with 16 values (4x4)
// Copy()                copy matrix, returs an exact copy of the matrix

// Creators
// Identity()            set identity matrix
// Zero()                set zero matrix
// Translation([x,y,z])  set translation matrix
// Scale([x,y,z])        set scale matrix
// RotationX(angle)      create rotation matrix around X-Axis. Angle in rad.
// RotationY(angle)      create rotation matrix around Y-Axis. Angle in rad.
// RotationZ(angle)      create rotation matrix around Z-Axis. Angle in rad.
// Operations:
// Transpose()           transpose current matrix
// Multiply(A,B)         multiply A * B and store in current matrix

//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------
function mat4(typeparam)
{
   if (typeparam == "double")
   {
      this._values = new Float64Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
   }
   else//(typeparam == "float")
   {
      this._values = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
   }
}
//------------------------------------------------------------------------------
// Set Values
//------------------------------------------------------------------------------
mat4.prototype.Set = function(oMatrix)
{
   if (oMatrix instanceof Float32Array || 
      oMatrix instanceof Float64Array)
   {
      // 4x4 Matrix (16 values)
      if (oMatrix.length == 16)
      {
         for (var i = 0; i < 16; i++)
         {
            this._values[i] = oMatrix[i];
         }
         return true;
      }
   }

  return false;
}
//------------------------------------------------------------------------------
// Copy matrix
//------------------------------------------------------------------------------
mat4.prototype.Copy = function()
{
   var cpy;

   if (this._values instanceof Array)
   {
      cpy = new mat4("native");
   }
   else if (this._values instanceof Float32Array)
   {
      cpy = new mat4("float");
   }
   else if (this._values instanceof Float64Array)
   {
      cpy = new mat4("double");
   }

   for (var i = 0; i < 16; i++)
   {
      cpy._values[i] = this._values[i];
   } 
   
   return cpy;
}
//------------------------------------------------------------------------------
// Set Identity
//------------------------------------------------------------------------------
mat4.prototype.Identity = function()
{
   this.Set([1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1]);
}

//------------------------------------------------------------------------------
// Set Zero
//------------------------------------------------------------------------------
mat4.prototype.Zero = function()
{
   this.Set([0,0,0,0,
             0,0,0,0,
             0,0,0,0,
             0,0,0,0]);
}

//------------------------------------------------------------------------------
// Create Translation matrix
//------------------------------------------------------------------------------
mat4.prototype.Translation = function(oVector)
{
   var x,y,z,w;
   if (oVector.length == 3)
   {
      x = oVector[0];
      y = oVector[1];
      z = oVector[2];
      w = 1;
   }
   else if (oVector.length == 4)
   {
      x = oVector[0];
      y = oVector[1];
      z = oVector[2];
      w = oVector[3];
   }
   else
   {
      return false;
   }
      
   this._values[0]  = 1; this._values[1]  = 0; this._values[2]  = 0; this._values[3]  = x;
   this._values[4]  = 0; this._values[5]  = 1; this._values[6]  = 0; this._values[7]  = y;
   this._values[8]  = 0; this._values[9]  = 0; this._values[10] = 1; this._values[11] = z;
   this._values[12] = 0; this._values[13] = 0; this._values[14] = 0; this._values[15] = w;
   
   return true;
   
}

//------------------------------------------------------------------------------
// Create Scale Matrix
//------------------------------------------------------------------------------
mat4.prototype.Scale = function(oVector)
{
   var x,y,z,w;
   if (oVector.length == 3)
   {
      x = oVector[0];
      y = oVector[1];
      z = oVector[2];
      w = 1;
   }
   else if (oVector.length == 4)
   {
      x = oVector[0];
      y = oVector[1];
      z = oVector[2];
      w = oVector[3];
   }
   else
   {
      return false;
   }

   this._values[0]  = x; this._values[1]  = 0; this._values[2]  = 0; this._values[3]  = 0;
   this._values[4]  = 0; this._values[5]  = y; this._values[6]  = 0; this._values[7]  = 0;
   this._values[8]  = 0; this._values[9]  = 0; this._values[10] = z; this._values[11] = 0;
   this._values[12] = 0; this._values[13] = 0; this._values[14] = 0; this._values[15] = w;
   
   return true;
   
}
//------------------------------------------------------------------------------
// Set Matrix to RotationX
//------------------------------------------------------------------------------
mat4.prototype.RotationX = function(angle)
{
   
   var fSin = Math.sin(angle);
   var fCos = Math.cos(angle);
   this._values[0]  = 1; this._values[1]  = 0;     this._values[2]  = 0;     this._values[3]  = 0;
   this._values[4]  = 0; this._values[5]  = fCos;  this._values[6]  = -fSin; this._values[7]  = 0;
   this._values[8]  = 0; this._values[9]  = fSin;  this._values[10] = fCos;  this._values[11] = 0;
   this._values[12] = 0; this._values[13] = 0;     this._values[14] = 0;     this._values[15] = 1;
}

//------------------------------------------------------------------------------
// Set Matrix to RotationY
//------------------------------------------------------------------------------
  
mat4.prototype.RotationY = function(angle)
{
   var fSin = Math.sin(angle);
   var fCos = Math.cos(angle);
   this._values[0]  = fCos;  this._values[1]  = 0;     this._values[2]  = fSin;  this._values[3]  = 0;
   this._values[4]  = 0;     this._values[5]  = 1;     this._values[6]  = 0;     this._values[7]  = 0;
   this._values[8]  = -fSin; this._values[9]  = 0;     this._values[10] = fCos;  this._values[11] = 0;
   this._values[12] = 0;     this._values[13] = 0;     this._values[14] = 0;     this._values[15] = 1;
}

//------------------------------------------------------------------------------
// Set Matrix to RotationZ
//------------------------------------------------------------------------------
mat4.prototype.RotationZ = function(angle)
{   
   var fSin = Math.sin(angle);
   var fCos = Math.cos(angle);
   this._values[0]  = fCos;  this._values[1]  = -fSin; this._values[2]  = 0;     this._values[3]  = 0;
   this._values[4]  = fSin;  this._values[5]  = fCos;  this._values[6]  = 0;     this._values[7]  = 0;
   this._values[8]  = 0;     this._values[9]  = 0;     this._values[10] = 1;     this._values[11] = 0;
   this._values[12] = 0;     this._values[13] = 0;     this._values[14] = 0;     this._values[15] = 1;
}

//------------------------------------------------------------------------------
// Multiply 2 matrices.
//------------------------------------------------------------------------------
mat4.prototype.Multiply = function(matA,matB)
{
   if (matA instanceof mat4 && matB instanceof mat4)
   {
   if (matA._values.length == 16 && matB._values.length == 16)
      {
        this._values[0]  = matA._values[0]  * matB._values[0] + matA._values[1]  * matB._values[4] + matA._values[2]  * matB._values[8]  + matA._values[3]  * matB._values[12];
        this._values[1]  = matA._values[0]  * matB._values[1] + matA._values[1]  * matB._values[5] + matA._values[2]  * matB._values[9]  + matA._values[3]  * matB._values[13];
        this._values[2]  = matA._values[0]  * matB._values[2] + matA._values[1]  * matB._values[6] + matA._values[2]  * matB._values[10] + matA._values[3]  * matB._values[14];
        this._values[3]  = matA._values[0]  * matB._values[3] + matA._values[1]  * matB._values[7] + matA._values[2]  * matB._values[11] + matA._values[3]  * matB._values[15];
        this._values[4]  = matA._values[4]  * matB._values[0] + matA._values[5]  * matB._values[4] + matA._values[6]  * matB._values[8]  + matA._values[7]  * matB._values[12];
        this._values[5]  = matA._values[4]  * matB._values[1] + matA._values[5]  * matB._values[5] + matA._values[6]  * matB._values[9]  + matA._values[7]  * matB._values[13];
        this._values[6]  = matA._values[4]  * matB._values[2] + matA._values[5]  * matB._values[6] + matA._values[6]  * matB._values[10] + matA._values[7]  * matB._values[14];
        this._values[7]  = matA._values[4]  * matB._values[3] + matA._values[5]  * matB._values[7] + matA._values[6]  * matB._values[11] + matA._values[7]  * matB._values[15];
        this._values[8]  = matA._values[8]  * matB._values[0] + matA._values[9]  * matB._values[4] + matA._values[10] * matB._values[8]  + matA._values[11] * matB._values[12];
        this._values[9]  = matA._values[8]  * matB._values[1] + matA._values[9]  * matB._values[5] + matA._values[10] * matB._values[9]  + matA._values[11] * matB._values[13];
        this._values[10] = matA._values[8]  * matB._values[2] + matA._values[9]  * matB._values[6] + matA._values[10] * matB._values[10] + matA._values[11] * matB._values[14];
        this._values[11] = matA._values[8]  * matB._values[3] + matA._values[9]  * matB._values[7] + matA._values[10] * matB._values[11] + matA._values[11] * matB._values[15];
        this._values[12] = matA._values[12] * matB._values[0] + matA._values[13] * matB._values[4] + matA._values[14] * matB._values[8]  + matA._values[15] * matB._values[12];
        this._values[13] = matA._values[12] * matB._values[1] + matA._values[13] * matB._values[5] + matA._values[14] * matB._values[9]  + matA._values[15] * matB._values[13];
        this._values[14] = matA._values[12] * matB._values[2] + matA._values[13] * matB._values[6] + matA._values[14] * matB._values[10] + matA._values[15] * matB._values[14];
        this._values[15] = matA._values[12] * matB._values[3] + matA._values[13] * matB._values[7] + matA._values[14] * matB._values[11] + matA._values[15] * matB._values[15];
      }
   }
}

//------------------------------------------------------------------------------
// Transpose Matrix
//------------------------------------------------------------------------------
mat4.prototype.Transpose = function()
{
   var cpy = this.Copy();  // Copy current matrix
   
   for (var j = 0; j < 4; j++)
   {
      for (var i = 0; i < 4; i++)
      {
         this._values[4*j+i] = cpy._values[4*i+j];
      }  
   }
}

//------------------------------------------------------------------------------
// Multiply Vec3
//------------------------------------------------------------------------------
mat4.prototype.MultiplyVec3 = function(vec)
{
   if(vec instanceof vec3)
   {
      if(this._values instanceof Float32Array)
      {
         resVec = new vec3("float"); 
      }
      else
      {
       resVec = new vec3("double");
      }  
      resVec._values[0]=this._values[0]*vec._values[0]+this._values[1]*vec._values[1]+this._values[2]*vec._values[2]+this._values[3]*1;
      resVec._values[1]=this._values[4]*vec._values[0]+this._values[5]*vec._values[1]+this._values[6]*vec._values[2]+this._values[7]*1;
      resVec._values[2]=this._values[8]*vec._values[0]+this._values[9]*vec._values[1]+this._values[10]*vec._values[2]+this._values[11]*1;    
      return resVec;
   }
}

//------------------------------------------------------------------------------
// Print Matrix using document.write
//----------------------------------------------------------
mat4.prototype.Print = function()
{
   if (this._values.length != 16)
   {
      console.log("Wrong matrix dimension! How can this happen!!<br/>");
      return false;
   }
   
   if (this._values instanceof Array)
   {
      //document.write("Matrix is native Array<br/>");
   }
   else if (this._values instanceof Float32Array)
   {
      //document.write("Matrix is Float32Array<br/>");
   }
   else if (this._values instanceof Float64Array)
   {
      //document.write("Matrix is Float64Array<br/>");
   }
   else
   {
      document.write("Error: Matrix type is wrong<br/>");
      return false;
   }
   
   for (var j = 0; j < 4; j++)
   {
      for (var i = 0; i < 4; i++)
      {
         console.log(this._values[4*j+i] + " ");
      }
   }
   return true;
}