#include <bits/stdc++.h>
using namespace std;

int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n,s,result=0;
        scanf("%d",&s);
        char arr[1000010];
        scanf("%s",arr);
        for(int i=0;i<s;i++) printf("%d ",arr[i]-'0');
        for(int i=0;i<s;i++) result+= arr[i]-'0';
        cout<<result<<endl;
    }
    return 0;
}
