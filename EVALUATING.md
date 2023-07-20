## Evaluation Points

1. Is the code written with team development in mind?
Yes, the code is written in modularity in mind as nestjs is a framework that specifically built with modularity, scalability and loosely coupled impplementation

2. Is it highly readable and maintainable?
Yes, but can do it better, but since the API is so minimal having too much abstraction just gonna make it confusing. Arguably, with more resources in the future we can utilize [Graphql Federation2](https://www.apollographql.com/docs/federation/), where we can define our code in microservice manner and make it more modular, maintainable and readable.

3. Is the implementation designed for actual use cases?
It approach tries to use implementation for actual use cases as much as possible. But, since the information limited the implementation is designed with the limited information in mind

4. Is the code designed so that the development speed does not slow down even if the number of members increases?
Yes, one of the advantage using nestjs is that it is injectable, which means you can manage your object or class whatsoever without the need to think about it's instantiation which make each resource loosely coupled from one to another

5. Is the code scalable to handle a 100-fold increase in the number of data?
Partially, I use redis as caching mechanism just to show that we can utilize caching for large number of data, another improvement that we can use is to implement [dataloader](https://github.com/graphql/dataloader) to reduce request to backends via batching and caching. More over in addition we can utilize infrastructure scalability using scalling and or balancing, event driven architecture and so on so forth