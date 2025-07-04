@echo off

@REM 密码
echo 密码: 123456
@REM 您的名字与姓氏是什么?
echo 名字与姓氏: 小荟企服
@REM 您的组织单位名称是什么?
echo 组织单位: 贵州利荟科技有限公司
@REM 您的组织名称是什么?
echo 组织名称: 研发部门
@REM 您所在的城市或区域名称是什么?
echo 城市或区域名称: 贵阳
@REM 您所在的省/市/自治区名称是什么?
echo 省/市/自治区名称: 贵州
@REM 该单位的双字母国家/地区代码是什么?
echo 国家/地区代码: CN

"%JAVA_HOME%\bin\keytool.exe" -genkey -v -keystore release.keystore -alias lihui -keyalg RSA -keysize 2048 -validity 36500

pause