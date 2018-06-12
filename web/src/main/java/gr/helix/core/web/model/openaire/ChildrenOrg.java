//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.06.07 at 06:10:45 PM EEST 
//


package gr.helix.core.web.model.openaire;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for childrenOrg complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="childrenOrg">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="organization" maxOccurs="unbounded" minOccurs="0">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;choice maxOccurs="unbounded">
 *                   &lt;element name="legalshortname" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="legalname" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="websiteurl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *                   &lt;element name="country" type="{http://namespace.openaire.eu/oaf}classedSchemedElement"/>
 *                 &lt;/choice>
 *                 &lt;attribute name="objidentifier" use="required" type="{http://www.w3.org/2001/XMLSchema}anySimpleType" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "childrenOrg", propOrder = {
    "organization"
})
public class ChildrenOrg {

    protected List<ChildrenOrg.Organization> organization;

    /**
     * Gets the value of the organization property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the organization property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getOrganization().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ChildrenOrg.Organization }
     * 
     * 
     */
    public List<ChildrenOrg.Organization> getOrganization() {
        if (organization == null) {
            organization = new ArrayList<ChildrenOrg.Organization>();
        }
        return this.organization;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;choice maxOccurs="unbounded">
     *         &lt;element name="legalshortname" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="legalname" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="websiteurl" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
     *         &lt;element name="country" type="{http://namespace.openaire.eu/oaf}classedSchemedElement"/>
     *       &lt;/choice>
     *       &lt;attribute name="objidentifier" use="required" type="{http://www.w3.org/2001/XMLSchema}anySimpleType" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "legalshortnameOrLegalnameOrWebsiteurl"
    })
    public static class Organization {

        @XmlElementRefs({
            @XmlElementRef(name = "country", type = JAXBElement.class, required = false),
            @XmlElementRef(name = "legalname", type = JAXBElement.class, required = false),
            @XmlElementRef(name = "websiteurl", type = JAXBElement.class, required = false),
            @XmlElementRef(name = "legalshortname", type = JAXBElement.class, required = false)
        })
        protected List<JAXBElement<?>> legalshortnameOrLegalnameOrWebsiteurl;
        @XmlAttribute(name = "objidentifier", required = true)
        @XmlSchemaType(name = "anySimpleType")
        protected String objidentifier;

        /**
         * Gets the value of the legalshortnameOrLegalnameOrWebsiteurl property.
         * 
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the legalshortnameOrLegalnameOrWebsiteurl property.
         * 
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getLegalshortnameOrLegalnameOrWebsiteurl().add(newItem);
         * </pre>
         * 
         * 
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link JAXBElement }{@code <}{@link ClassedSchemedElement }{@code >}
         * {@link JAXBElement }{@code <}{@link String }{@code >}
         * {@link JAXBElement }{@code <}{@link String }{@code >}
         * {@link JAXBElement }{@code <}{@link String }{@code >}
         * 
         * 
         */
        public List<JAXBElement<?>> getLegalshortnameOrLegalnameOrWebsiteurl() {
            if (legalshortnameOrLegalnameOrWebsiteurl == null) {
                legalshortnameOrLegalnameOrWebsiteurl = new ArrayList<JAXBElement<?>>();
            }
            return this.legalshortnameOrLegalnameOrWebsiteurl;
        }

        /**
         * Gets the value of the objidentifier property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getObjidentifier() {
            return objidentifier;
        }

        /**
         * Sets the value of the objidentifier property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setObjidentifier(String value) {
            this.objidentifier = value;
        }

    }

}
