export class Appsettings { 
     static Measurements = class{
      public static None: string  = "";      
      public static Kilograms: string  = "kg";
      public static Pieces: string  = "Pieces";
      public static Litres: string = "L";

      public static readonly units: string[] =
         [this.None, this.Kilograms, this.Pieces, this.Litres]

    }
}