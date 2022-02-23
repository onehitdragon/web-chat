using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using WebSocketSharp;
using WebSocketSharp.Server;

public class Behavior : WebSocketBehavior{
    protected override void OnMessage (MessageEventArgs e)
    {
        Console.WriteLine(e.Data);
        Send("thanks for send");
    }
}
public class SocketListener{
    public static void StartSocket(){
        var wssv = new WebSocketServer("ws://127.0.0.1:12345");

        wssv.AddWebSocketService<Behavior>("/Behavior");
        Console.WriteLine("Listing ws://127.0.0.1:12345/Behavior...");
        wssv.Start();
        Console.ReadKey();
        wssv.Stop();
        Console.WriteLine("Stop server!");
    }
}