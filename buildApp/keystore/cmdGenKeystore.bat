@echo off

@REM ����
echo ����: 123456
@REM ����������������ʲô?
echo ����������: С�����
@REM ������֯��λ������ʲô?
echo ��֯��λ: ���������Ƽ����޹�˾
@REM ������֯������ʲô?
echo ��֯����: �з�����
@REM �����ڵĳ��л�����������ʲô?
echo ���л���������: ����
@REM �����ڵ�ʡ/��/������������ʲô?
echo ʡ/��/����������: ����
@REM �õ�λ��˫��ĸ����/����������ʲô?
echo ����/��������: CN

"%JAVA_HOME%\bin\keytool.exe" -genkey -v -keystore release.keystore -alias lihui -keyalg RSA -keysize 2048 -validity 36500

pause