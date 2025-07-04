import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.util.Enumeration;

public class GetKeystoreSign {

  public static void main(String[] args) {
    if (args.length != 2) {
      System.err.println("Usage: java KeyStoreInfo <keystore-path> <keystore-password>");
      System.exit(1);
    }

    String keystorePath = args[0];
    String keystorePassword = args[1];

    try {
      // 加载密钥库文件
      FileInputStream is = new FileInputStream(keystorePath);
      KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
      // 提供密钥库密码
      keystore.load(is, keystorePassword.toCharArray());

      // 获取密钥库中的所有别名
      Enumeration<String> enumeration = keystore.aliases();
      while (enumeration.hasMoreElements()) {
        String alias = enumeration.nextElement();
        Certificate certificate = keystore.getCertificate(alias);
        PublicKey publicKey = certificate.getPublicKey();

        // 显示别名和公钥
        System.out.println("Alias Name: " + alias);
        System.out.println("Public Key: " + publicKey);

        // 显示证书信息
        System.out.println("Certificate: " + certificate.toString());

        // 计算并显示 MD5, SHA-1, 和 SHA-256 指纹
        System.out.println("MD5 Fingerprint: " + getFingerprint(certificate, "MD5"));
        System.out.println("SHA-1 Fingerprint: " + getFingerprint(certificate, "SHA-1"));
        System.out.println("SHA-256 Fingerprint: " + getFingerprint(certificate, "SHA-256"));
        System.out.println("---");
      }
      is.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
   private static String getFingerprint(Certificate certificate, String algorithm) {
    try {
      MessageDigest md = MessageDigest.getInstance(algorithm);
      byte[] publicKey = certificate.getEncoded();
      md.update(publicKey);
      byte[] digest = md.digest();

      // 将字节转换为十六进制表示形式，并在每两个字符之间插入冒号
      StringBuilder hexString = new StringBuilder();
      for (byte b : digest) {
        String hex = Integer.toHexString(0xff & b);
        if (hex.length() == 1) hexString.append('0');
        hexString.append(hex);
        hexString.append(":");  // 添加冒号
      }
      // 移除最后一个冒号
      hexString.deleteCharAt(hexString.length() - 1);
      return hexString.toString().toUpperCase();  // 转换为大写
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}