package gr.helix.core.web.model.openaire.client;

import gr.helix.core.web.model.openaire.server.JournalType;

public class Journal {

    private String issn;
    private String eissn;
    private String lissn;
    private String ep;
    private String iss;
    private String sp;
    private String vol;
    private String title;

    public String getIss() {
        return this.iss;
    }

    public void setIss(String iss) {
        this.iss = iss;
    }

    public String getIssn() {
        return this.issn;
    }

    public void setIssn(String issn) {
        this.issn = issn;
    }

    public String getEissn() {
        return this.eissn;
    }

    public void setEissn(String eissn) {
        this.eissn = eissn;
    }

    public String getLissn() {
        return this.lissn;
    }

    public void setLissn(String lissn) {
        this.lissn = lissn;
    }

    public String getVol() {
        return this.vol;
    }

    public void setVol(String vol) {
        this.vol = vol;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEp() {
        return this.ep;
    }

    public void setEp(String ep) {
        this.ep = ep;
    }

    public String getSp() {
        return this.sp;
    }

    public void setSp(String sp) {
        this.sp = sp;
    }

    public static Journal from(JournalType value) {
        final Journal instance = new Journal();
        instance.iss = value.getIss();
        instance.eissn = value.getEissn();
        instance.issn = value.getIssn();
        instance.lissn = value.getLissn();
        instance.title = value.getValue();
        instance.vol = value.getVol();
        instance.sp = value.getSp();
        instance.ep = value.getEp();
        return instance;
    }

}
