"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./style.css"; // Ensure your CSS is in this file

const TreeDiagram = ({ data }) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    content: "",
    left: 0,
    top: 0,
  });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (data) {
      renderTree(data);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        event.target.closest(".node") === null
      ) {
        setTooltip((prev) => ({
          ...prev,
          opacity: 0,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderTree = (data) => {
    const width = 1200;
    const height = 1000;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(400,0)");

    const treeLayout = d3.tree().size([height, width - 600]);
    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    svg
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        (d) => `
        M${d.source.y},${d.source.x}
        C${d.source.y + 100},${d.source.x}
         ${d.target.y - 0},${d.target.x}
         ${d.target.y},${d.target.x}`
      );

    const nodes = svg
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .on("mouseover", (event, d) => {
        let tooltipHtml = `<strong>${d.data.name}</strong><br/>${
          d.data.details || ""
        }`;
        if (d.data.links && d.data.links.length > 0) {
          tooltipHtml += `<br/><br/><strong>Resources:</strong><br/>`;
          d.data.links.forEach((link) => {
            tooltipHtml += `<a href="${link}" target="_blank" style="color: YELLOW; text-decoration: underline;">${link}</a><br/>`;
          });
        }
        setTooltip({
          opacity: 1,
          content: tooltipHtml,
          left: event.pageX + 10,
          top: event.pageY - 28,
        });
      })
      .on("mouseout", () => {
        // Do nothing on mouseout to keep the tooltip visible
      });

    nodes.append("circle").attr("r", 8);

    nodes
      .append("text")
      .attr("dy", 3)
      .attr("x", (d) => (d.children ? -12 : 12))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        ref={tooltipRef}
        className="tooltip"
        style={{
          opacity: tooltip.opacity,
          left: tooltip.left,
          top: tooltip.top,
          position: "absolute",
          textAlign: "center",
          width: "200px",
          padding: "5px",
          font: "12px sans-serif",
          background: "#333",
          color: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          pointerEvents: "auto", // Make sure pointer events are enabled
          cursor: "pointer", // Change cursor to pointer
          transition: "opacity 0.3s ease",
        }}
        dangerouslySetInnerHTML={{ __html: tooltip.content }}
      />
    </div>
  );
};

export default TreeDiagram;
