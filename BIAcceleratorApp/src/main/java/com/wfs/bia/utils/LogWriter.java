package com.wfs.bia.utils;

/**
 * Created by wajahat on 21/02/2016.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import org.apache.log4j.Level;
import org.slf4j.Logger;

public class LogWriter  extends PrintWriter {

    private Logger logger;
    private Level level;
    private boolean inWrite;
    private boolean issuedWarning;

    public LogWriter(Logger logger) {
        this(logger, Level.INFO);
    }

    public LogWriter(Logger logger, Level level) {
        super(new LogWriter.InternalLoggerWriter(logger, level), true);
    }

    static class InternalLoggerWriter extends Writer {
        private Logger logger;
        private Level level;
        private boolean closed;

        public InternalLoggerWriter(Logger logger, Level level) {
            this.lock = logger;
            this.logger = logger;
            this.level = level;
        }

        public void write(char[] cbuf, int off, int len) throws IOException {
            if(this.closed) {
                throw new IOException("Attempted to write on a closed Log Writer");
            } else {
                while(len > 0 && (cbuf[len - 1] == 10 || cbuf[len - 1] == 13)) {
                    --len;
                }

                if(len > 0) {
                    this.logger.debug(String.copyValueOf(cbuf, off, len));
                }

            }
        }

        public void flush() throws IOException {
            if(this.closed) {
                throw new IOException("Attempted to flush a closed Log Writer");
            }
        }

        public void close() {
            this.closed = true;
        }
    }

}
