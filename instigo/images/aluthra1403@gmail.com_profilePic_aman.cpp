#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;
   int main(int argc ,char* argv[]){
                                    int sum=0;
                                     vector <string> task1;
                                     string data;
ifstream infile;
infile.open(argv[1]);               //reading the input file.
while(infile >>data){
                    task1.push_back(data);
                        sum=sum+1;}
 

      int x=sum;             //" sum/2" is size of no. of edges. 

      string a[sum];
for (int i=0; i<task1.size(); i++){



                                     a[i]=task1[i];       //storing the no. of inputs in an array.
}

for (int i=0; i<sum;i++){
                      for (int j=i+1; j<sum; j++){
                                                  if(a[i]==a[j]){x=x-1;

                                                     break;}       // "x" is no. of unique vertices.
 
	
		
                        }
    }

cout<<x<< " " <<sum/2<<endl;

string c[x];                             // "c[i]" is an array to store vertices without repeatition.

int p=0,found=0;
for (int i=0; i<sum;i++){
                         for (int j=i+1; j<sum; j++){
                                                      if(a[i]==a[j]){found=1;
                                                       break;}
}
                          if(found==0){
                                      c[p]=a[i];         
                                        p=p+1;
                                         }
found=0;
}          for (p=0; p<x; p++){
                                cout<<c[p]<<endl;}


int count=0,d[x];                                   //"d[x]" is array to store degree of vertices.
for (int i=0;i<x;i++){
                      for (int j=0; j<sum ;j++){                 //count=no. of degree of a vertex
                                             if (c[i]==a[j]){count=count+1;}}
                       cout<<c[i]<<" "<<count<<endl;                                         
                        d[i]=count;
                          count=0;}


string t;int j,key;                                 // sorting an array " according to their degree.
for( int i=1; i<x; i++){
                        key=d[i];
                         t=c[i];
                          j=i-1;
                        while(d[j]>key & j>=0){
                                              d[j+1]=d[j];
                                              c[j+1]=c[j];      //arrange vertices acc.to deg         
                                                 j=j-1;}
                       d[j+1]=key;
                       c[j+1]=t;}

for(int i=0;i<x;i++){
                     cout<<c[i]<<" "<<d[i]<<endl;}}














	


