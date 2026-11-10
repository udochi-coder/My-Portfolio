package Test;

import org.testng.annotations.Test;
import writer.FileDataWriter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class FileDataWriterTest {

    @Test
    public void writeFileWritesTextToFile() throws IOException {
        Path filePath = Path.of("src/output/file-data-writer-test.txt");
        String Text = "1\n2\n3";

        Files.createDirectories(filePath.getParent());
        Files.deleteIfExists(filePath);

        try {
            FileDataWriter.writeFile(Text, filePath);

            assertTrue(Files.exists(filePath));
            assertEquals(Text, Files.readString(filePath));
        } finally {
            Files.deleteIfExists(filePath);
        }
    }


}
