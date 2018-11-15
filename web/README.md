# HELIX Web Application

HELIX main site

## Quickstart

### Build

Install SASS globally to be used as CSS compiler:

    sudo gem install sass

Copy configuration examples from `config-examples/` into `/src/main/resources/config/`, and edit to adjust to your needs.

    cp config-example/* /src/main/resources/config/

Build the project:

    mvn clean package

Build documentation:

    mvn site

### Run as standalone JAR

Run application (with an embedded Tomcat 8.x server):

     java -jar target/helix-core-web.jar

### Run as WAR on a servlet container

Normally a WAR archive can be deployed at any servlet container. The following is only tested on a Tomcat 8.x.

Open `pom.xml` and change packaging type to `war`, in order to produce a WAR archive.

Ensure that the following section is uncommented (to avoid packaging an embedded server):

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>    
```

Rebuild, and deploy generated `target/helix-core-web.war` on a Tomcat 8.x servlet container.
