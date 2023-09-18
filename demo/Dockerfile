FROM maven:3.8.1-openjdk-17-slim AS build
COPY ./src /home/app/src
COPY ./pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests


FROM openjdk:17-jdk-alpine3.13
COPY --from=build /home/app/target/demo-0.0.1-SNAPSHOT.jar /home/app/demo-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "/home/app/demo-0.0.1-SNAPSHOT.jar"]
