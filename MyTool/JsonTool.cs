using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace project.MyTool{
    public class JsonTool{
        public static string EnCode(object _object){
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return JsonConvert.SerializeObject(_object, settings);
        }
        public static object DeCode(string json){ 
            return JsonConvert.DeserializeObject(json);
        }
        public static T DeCode<T>(string json){ 
            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}