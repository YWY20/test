import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Pachong {
    public static void main(String[] args) {
        String str = "java啊哇哇哇，阿达伟大21221java22撒到我，ava2阿瓦蒂1java1";
        Pattern p = Pattern.compile("java\\d{0,4}");
        Matcher m = p.matcher(str);
        while (m.find()) {
            System.out.println(m.group());
        }

    }
}
