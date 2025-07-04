@echo off

"%JAVA_HOME%\bin\javac" -encoding UTF-8 GetKeystoreSign.java
"%JAVA_HOME%\bin\java" GetKeystoreSign release.keystore 123456

del /f GetKeystoreSign.class

pause